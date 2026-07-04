export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const clientId = env.GITHUB_CLIENT_ID || env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = env.GITHUB_CLIENT_SECRET || env.GITHUB_OAUTH_CLIENT_SECRET;

  if (!code) {
    return oauthPage('error', { message: 'GitHub did not return an authorization code.' });
  }

  if (!clientId || !clientSecret) {
    return oauthPage('error', { message: 'Missing GitHub OAuth environment variables.' });
  }

  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
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

  return new Response(
    `<!doctype html>
<html>
  <body>
    <script>
      (function() {
        var message = ${JSON.stringify(message)};
        var receiveMessage = function(event) {
          if (window.opener) {
            window.opener.postMessage(message, event.origin);
            window.removeEventListener('message', receiveMessage, false);
            window.close();
          }
        };

        window.addEventListener('message', receiveMessage, false);

        if (window.opener) {
          window.opener.postMessage('authorizing:github', '*');
        } else {
          document.body.textContent = 'Authentication complete. Please return to the CMS tab.';
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
