import type { User } from "~/types/User"

export default defineEventHandler(async (event): Promise<User | null> => {
  const user: User | null = event.context.user;

  if (!user) {
    return null;
  }

  return user;
});