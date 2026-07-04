export async function onRequestGet({ request, env }) {
  if (!env.GITHUB_OAUTH_CLIENT_ID) {
    return new Response('Missing GITHUB_OAUTH_CLIENT_ID.', { status: 500 });
  }

  const url = new URL(request.url);
  const redirectUri = `${url.origin}/api/callback`;
  const state = crypto.randomUUID();
  const params = new URLSearchParams({
    client_id: env.GITHUB_OAUTH_CLIENT_ID,
    redirect_uri: redirectUri,
    scope: 'repo,user',
    state,
  });

  return Response.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`, 302);
}
