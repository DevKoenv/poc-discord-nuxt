export default defineEventHandler(async (event): Promise<Guilds> => {
  const config = useRuntimeConfig();
  const guilds = await $fetch(`${config.backendUrl}/api/users/me/guilds`, {
    headers: {
      Authorization: `Bearer ${event.context.token}`,
    },
  });

  return guilds;
});
