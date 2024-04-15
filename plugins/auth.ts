export default defineNuxtPlugin(async (nuxtApp) => {
  const { me } = useAuth();

  await me();
});
