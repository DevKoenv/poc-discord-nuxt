export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const reqUrl = getRequestURL(event);
  return proxyRequest(
    event,
    config.public.backendUrl + reqUrl.pathname + reqUrl.search
  ).catch((error) => {
    return new Response(null, { status: 500 });
  });
});
