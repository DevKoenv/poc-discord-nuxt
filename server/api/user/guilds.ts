import type { User } from "~/types/User";
export default defineEventHandler(async (event): Promise<any> => { 
  const config = useRuntimeConfig();
  const guilds = await $fetch(`${config.backendUrl}/api/user/guilds`, {
    headers: {
      Authorization: `Bearer ${event.context.token}`,
    },
  });

  return guilds;
});
