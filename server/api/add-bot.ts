export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  return sendRedirect(
    event,
    ` https://discord.com/oauth2/authorize?client_id=${config.public.discordClientId}&scope=bot&permissions=1099511627775`,
  );
});
