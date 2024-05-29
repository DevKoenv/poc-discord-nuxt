export default defineEventHandler(async (event) => {
  const user = await getUserFromToken(event);
  const token = await getToken(event);
  
  if (user) {
    event.context.user = user;
  }

  if (token) {
    event.context.token = token;
  }
});
