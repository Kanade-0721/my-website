export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return oauthPage('error', { message: 'GitHub did not return an authorization code.' });
  }

  if (!env.GITHUB_OAUTH_CLIENT_ID || !env.GITHUB_OAUTH_CLIENT_SECRET) {
    return oauthPage('error', { message: 'Missing GitHub OAuth environment variables.' });
  }

  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: env.GITHUB_OAUTH_CLIENT_ID,
      client_secret: env.GITHUB_OAUTH_CLIENT_SECRET,
      code,
      redirect_uri: `${url.origin}/api/callback`,
    }),
  });
  const tokenData = await tokenResponse.json();

  if (!tokenResponse.ok || !tokenData.access_token) {
    return oauthPage('error', {
      message: tokenData.error_description || tokenData.error || 'Failed to get a GitHub access token.',
    });
  }

  return oauthPage('success', {
    token: tokenData.access_token,
    provider: 'github',
  });
}

function oauthPage(type, payload) {
  const message = `authorization:github:${type}:${JSON.stringify(payload)}`;
  const objectMessage = {
    type: `authorization:github:${type}`,
    provider: 'github',
    ...payload,
  };

  return new Response(
    `<!doctype html>
<html>
  <body>
    <script>
      (function() {
        var message = ${JSON.stringify(message)};
        var objectMessage = ${JSON.stringify(objectMessage)};
        if (window.opener) {
          window.opener.postMessage(message, '*');
          window.opener.postMessage(objectMessage, '*');
          window.close();
        } else {
          document.body.textContent = 'Authentication complete. You can close this window.';
        }
      })();
    </script>
  </body>
</html>`,
    {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    },
  );
}
