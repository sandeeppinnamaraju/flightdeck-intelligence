export type UserRole = "ADMIN" | "VIEWER" | "CONTRIBUTOR";

export interface AuthUser {
  username: string;
  password: string;
  role: UserRole;
}

export const AUTH_USERS: AuthUser[] = [
  { username: "admin", password: "eagle@123", role: "ADMIN" },
  { username: "viewer", password: "eagle@123", role: "VIEWER" },
  { username: "contributor", password: "eagle@123", role: "CONTRIBUTOR" },
];
