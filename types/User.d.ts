import type { UserRoles } from "~/enums/User";

export interface User {
  id:                     string;
  username:               string;
  avatar:                 string;
  discriminator:          string;
  public_flags:           number;
  flags:                  number;
  banner:                 null;
  accent_color:           number;
  global_name:            string;
  avatar_decoration_data: null;
  banner_color:           string;
  clan:                   null;
  mfa_enabled:            boolean;
  locale:                 string;
  premium_type:           number;
  email:                  string;
  verified:               boolean;
  roles:                  UserRoles[]; 
}
