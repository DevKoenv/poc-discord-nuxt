import type { Command } from "~/types/Command";

export default defineEventHandler(async (event): Promise<Command[]> => {
  const config = useRuntimeConfig();

  const { guildId, commandId } = getRouterParams(event);

  const commands = await $fetch<Command[]>(
    `${config.backendUrl}/api/guilds/${guildId}/commands/${commandId}`,
    {
      headers: {
        Authorization: `Bearer ${event.context.token}`,
      },
    },
  );

  return commands;
});
