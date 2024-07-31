export default defineEventHandler(async (event): Promise<any> => {
  const config = useRuntimeConfig();
  const guilds = await $fetch(`${config.backendUrl}/api/users/me/guilds`, {
    headers: {
      Authorization: `Bearer ${event.context.token}`,
    },
  });

  return guilds;
});
