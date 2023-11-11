export interface AuthConfig {
  readonly jwtSecret: string;
  readonly jwtExpirationTime: number;
  readonly jwtRefreshSecret: string;
  readonly jwtRefreshExpirationTime: number;
  readonly headerKeyApiKey: string;
  readonly apiKey: string;
}
