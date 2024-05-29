import { H3Event } from "h3";

export async function getToken(event: H3Event) {
  const token = getCookie(event, "token");
  return token;
}

export async function getUserFromToken(event: H3Event) {
  const token = await getToken(event);
  
  if (!token) {
    return null;
  }

  const user = await getUser(token);

  return user;
}
