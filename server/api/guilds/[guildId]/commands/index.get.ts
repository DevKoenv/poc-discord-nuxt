import type { Command } from "~/types/Command";

export default defineEventHandler(async (event): Promise<Command[]> => {
  const config = useRuntimeConfig();

  const { guildId } = getRouterParams(event);

  const commands = await $fetch<Command[]>(
    `${config.backendUrl}/api/guilds/${guildId}/commands`,
    {
      headers: {
        Authorization: `Bearer ${event.context.token}`,
      },
    },
  );

  return commands;
});
