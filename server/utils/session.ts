import { H3Event } from "h3";

export async function getUserFromToken(event: H3Event) {
  const token = getCookie(event, "token");
  if (!token) {
    return null;
  }

  const user = await getUser(token);

  return user;
  
  
  // if (user) {
  //   event.context.user = user;
  // }
}
