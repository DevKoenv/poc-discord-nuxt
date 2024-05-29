import type { User } from "~/types/User";
import { UserRoles } from "~/types/UserRoles";

export const useAuthStore = () => {
  const user = useState<User>("user", () => null as unknown as User);

  const setUser = (newUser: User) => {
    user.value = newUser;
    return user;
  };

  const removeUser = () => {
    user.value = null as unknown as User;
    return user;
  };

  const isAdmin = () => {
    if (!user.value) return false;
    return user.value.roles.some(role => role.name === UserRoles.ADMIN);
  };

  const login = async (provider: string) => {
    navigateTo(`/api/auth/${provider}`, {
      external: true,
    });
  };

  const logout = async () => {
    removeUser();

    navigateTo("/api/auth/logout", {
      external: true,
    });
  };

  return {
    user,
    setUser,
    removeUser,
    isAdmin,

    login,
    logout,
  };
};
