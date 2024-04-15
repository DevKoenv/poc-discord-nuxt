export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const code = getRequestURL(event).searchParams.get("code");

  if (!code) {
    return sendRedirect(event, "/auth/login?error=404");
  }

  try {
    const response = await $fetch<{ token: string }>(
      `${config.backendUrl}/api/auth/token`,
      {
        method: "POST",
        body: {
          code,
        },
      }
    );

    setCookie(event, "token", response.token, {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return sendRedirect(event, "/");
  } catch (e) {
    deleteCookie(event, "token")
    return sendRedirect(event, "/auth/login?error=500");
  }
});
