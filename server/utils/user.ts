import { User } from "~/types/User";

const config = useRuntimeConfig();

export async function getUser(token: string) {
  const user = await $fetch<User>(`${config.backendUrl}/api/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return user;
}
