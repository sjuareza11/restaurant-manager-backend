export const envAuthConfig = () => ({
  jwtSecret: process.env.JWT_SECRET || '74YLbq4%c!wU',
  jwtExpirationTime: parseInt(process.env.JWT_EXPIRATION_TIME) || 1800,
  jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET || '7jML9q4-c!s0',
  jwtRefreshExpirationTime:
    parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME) || 86400,
});
