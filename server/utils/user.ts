import type { User } from "~/types/User";

const config = useRuntimeConfig();

export async function getUser(token: string) {
  const user = await $fetch<User>(`${config.backendUrl}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch((error) => {
    return null;
  });

  return user;
}
