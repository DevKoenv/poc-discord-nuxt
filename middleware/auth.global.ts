export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user, isAdmin } = useAuthStore();

  if (to.meta.auth === "guest") {
    if (user.value) {
      return navigateTo("/");
    }
    return;
  }

  if (!user.value) {
    return navigateTo("/auth/login");
  }

  if (to.meta.auth === "admin" && !isAdmin) {
    return navigateTo("/");
  }
});
