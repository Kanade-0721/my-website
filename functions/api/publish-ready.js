const OWNER = 'Kanade-0721';
const REPO = 'my-website';
const BASE_BRANCH = 'main';
const ALLOWED_LOGIN = 'Kanade-0721';
const READY_LABELS = new Set([
  'netlify-cms/pending_publish',
  'decap-cms/pending_publish',
  'pending_publish',
  'ready',
]);

export async function onRequestPost({ request }) {
  const token = getBearerToken(request);

  if (!token) {
    return json(401, { error: 'Please log in to Decap CMS with GitHub first.' });
  }

  try {
    const user = await github(token, '/user');

    if (user.login !== ALLOWED_LOGIN) {
      return json(403, { error: `GitHub user ${user.login} is not allowed to publish this site.` });
    }

    const pulls = await github(token, `/repos/${OWNER}/${REPO}/pulls?state=open&base=${BASE_BRANCH}&per_page=100`);
    const readyPulls = pulls.filter((pull) =>
      pull.labels?.some((label) => READY_LABELS.has(String(label.name).toLowerCase())),
    );
    const results = [];

    for (const pull of readyPulls) {
      try {
        const merged = await github(token, `/repos/${OWNER}/${REPO}/pulls/${pull.number}/merge`, {
          method: 'PUT',
          body: JSON.stringify({
            commit_title: `Publish ${pull.title}`,
            merge_method: 'merge',
          }),
        });

        results.push({
          number: pull.number,
          title: pull.title,
          merged: Boolean(merged.merged),
          message: merged.message,
        });
      } catch (error) {
        results.push({
          number: pull.number,
          title: pull.title,
          merged: false,
          error: error instanceof Error ? error.message : 'Merge failed.',
        });
      }
    }

    return json(200, {
      count: readyPulls.length,
      results,
    });
  } catch (error) {
    return json(500, { error: error instanceof Error ? error.message : 'Publish failed.' });
  }
}

async function github(token, path, init = {}) {
  const response = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'kanade-website-cms',
      'X-GitHub-Api-Version': '2022-11-28',
      ...init.headers,
    },
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(data.message || `GitHub API request failed: ${response.status}`);
  }

  return data;
}

function getBearerToken(request) {
  const authorization = request.headers.get('Authorization') || '';
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  return match?.[1] || '';
}

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
