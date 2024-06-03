export default defineEventHandler(async (event): Promise<any> => {
  const config = useRuntimeConfig();

  const { id } = getRouterParams(event);

  const commands = await $fetch<Command[]>(`${config.backendUrl}/api/guilds/${id}/commands`, {
    headers: {
      Authorization: `Bearer ${event.context.token}`,
    },
  });

  return commands;
});
