export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const reqUrl = getRequestURL(event);
  return proxyRequest(
    event,
    config.backendUrl + reqUrl.pathname + reqUrl.search,
  ).catch((_error) => {
    return new Response(null, { status: 500 });
  });
});
