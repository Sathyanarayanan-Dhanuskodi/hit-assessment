export const ACCESS_TOKEN_EXPIRATION = 24 * 60 * 60; // 24 hours
export const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY ?? '';

export const ROLES = {
  ADMIN: 1,
  EDITOR: 2,
  VIEWER: 3
};
