export async function onRequest(context) {
  const { request, env, params } = context;
  const url = new URL(request.url);
  const path = url.pathname;
  
  // Root path
  if (path === '/' || path === '') {
    return new Response('hello', {
      headers: { 'content-type': 'text/plain' }
    });
  }
  
  // Panel path: /<uuid>
  const uuidMatch = path.match(/^\/([a-f0-9-]{36})$/);
  if (uuidMatch) {
    const uuid = uuidMatch[1];
    if (uuid === env.u) {
      return new Response('Panel page - placeholder', {
        headers: { 'content-type': 'text/html' }
      });
    }
    return new Response('Not Found', { status: 404 });
  }
  
  // Subscription path: /<uuid>/sub
  const subMatch = path.match(/^\/([a-f0-9-]{36})\/sub$/);
  if (subMatch) {
    const uuid = subMatch[1];
    if (uuid === env.u) {
      return new Response('base64 subscription content', {
        headers: { 'content-type': 'text/plain' }
      });
    }
    return new Response('Not Found', { status: 404 });
  }
  
  return new Response('Not Found', { status: 404 });
}
