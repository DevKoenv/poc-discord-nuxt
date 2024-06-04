export default defineEventHandler(async (event): Promise<any> => {
  const config = useRuntimeConfig();

  const { guildId } = getRouterParams(event);

  const guilds = await $fetch(`${config.backendUrl}/api/guilds/${guildId}`, {
    headers: {
      Authorization: `Bearer ${event.context.token}`,
    },
  });

  return guilds;
});
