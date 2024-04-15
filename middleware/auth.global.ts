import { UserRoles } from "~/enums/User";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user } = useAuthStore();

  if (to.meta.auth === "guest") {
    if (user.value) {
      return navigateTo("/");
    }
    return;
  }

  if (!user.value) {
    return navigateTo("/auth/login");
  }

  if (to.meta.auth === "admin" && !user.value.roles.includes(UserRoles.ADMIN)) {
    return navigateTo("/");
  }
});
