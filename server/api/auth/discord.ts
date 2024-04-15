export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const discordClientId = config.public.discordClientId;

  const encodedRedirectUri = encodeURIComponent(
    config.public.discordRedirectUri
  );

  const scopes = ["identify", "email", "guilds"];

  const url = `https://discord.com/api/oauth2/authorize?client_id=${discordClientId}&redirect_uri=${encodedRedirectUri}&response_type=code&scope=${scopes.join('+')}`;


  return sendRedirect(event, url);
});
