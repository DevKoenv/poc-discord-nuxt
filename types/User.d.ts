interface Roles {
  id: number;
  name: UserRoles
}
export interface User {
  id: string;
  username: string;
  avatar: string;
  global_name: string;
  email: string;
  roles: Roles[];
}
