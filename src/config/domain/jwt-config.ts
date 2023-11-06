export interface JWTConfig {
  readonly jwtSecret: string;
  readonly jwtExpirationTime: number;
  readonly jwtRefreshSecret: string;
  readonly jwtRefreshExpirationTime: number;
}
