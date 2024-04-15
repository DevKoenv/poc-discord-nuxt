export default defineEventHandler(async (event) => {
  deleteCookie(event, "token", {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    // secure: process.env.NODE_ENV === "production",
  });

  return sendRedirect(event, "/auth/login");
});
