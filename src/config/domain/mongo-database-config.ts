export interface MongoDatabaseConfig {
  readonly host: string;
  readonly port: string | number;
  readonly dbName: string;
  readonly user: string;
  readonly password: string;
}
