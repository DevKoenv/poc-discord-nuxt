interface Roles {
  id: number;
  name: UserRoles
}
export interface User {
  id: string;
  username: string;
  avatar: string;
  globalName: string;
  email: string;
  roles: Roles[];
}
