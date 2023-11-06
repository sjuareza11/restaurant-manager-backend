const JWT_SECRET = process.env.JWT_SECRET || '74YLbq4%c!wU';
const JWT_EXPIRATION_TIME = parseInt(process.env.JWT_EXPIRATION_TIME) || 1800;
const JWT_REFRESH_TOKEN_SECRET =
  process.env.JWT_REFRESH_TOKEN_SECRET || '7jML9q4-c!s0';
const JWT_REFRESH_TOKEN_EXPIRATION_TIME =
  parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME) || 86400;

export const AUTH_CONFIG = {
  jwtSecret: JWT_SECRET,
  jwtExpirationTime: JWT_EXPIRATION_TIME,
  jwtRefreshSecret: JWT_REFRESH_TOKEN_SECRET,
  jwtRefreshExpirationTime: JWT_REFRESH_TOKEN_EXPIRATION_TIME,
};
