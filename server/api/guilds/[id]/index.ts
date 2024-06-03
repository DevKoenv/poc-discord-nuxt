export default defineEventHandler(async (event): Promise<any> => {
  const config = useRuntimeConfig();

  const { id } = getRouterParams(event);

  const guilds = await $fetch(`${config.backendUrl}/api/guilds/${id}`, {
    headers: {
      Authorization: `Bearer ${event.context.token}`,
    },
  });

  return guilds;
});
