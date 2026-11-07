export async function onRequest(context) {
  return new Response("Hello from Pages Function!", {
    headers: { "content-type": "text/plain" }
  });
}
