import type { User } from "~/types/User";

export const useAuth = () => {
  const { user, setUser, removeUser } = useAuthStore();

  const me = async () => {
    if (!user.value) {
      try {
        const data = await $fetch("/api/users/me", {
          headers: useRequestHeaders(["cookie"]) as HeadersInit,
          credentials: "include",
        });

        setUser(data as User);
      } catch (e) {
        removeUser();
      }
    }

    return user.value;
  };

  return {
    me,
  };
};
