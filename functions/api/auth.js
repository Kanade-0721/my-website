export async function onRequestGet({ request, env }) {
  const clientId = env.GITHUB_CLIENT_ID || env.GITHUB_OAUTH_CLIENT_ID;

  if (!clientId) {
    return new Response('Missing GITHUB_CLIENT_ID.', { status: 500 });
  }

  const url = new URL(request.url);
  const redirectUri = `${url.origin}/api/callback`;
  const state = crypto.randomUUID();
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'repo user',
    state,
  });

  return Response.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`, 302);
}
