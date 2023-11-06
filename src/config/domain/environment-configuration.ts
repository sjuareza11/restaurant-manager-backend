import { JWTConfig } from './jwt-config';
import { MongoDatabaseConfig } from './mongo-database-config';

export interface EnviromentConfiguration {
  readonly environment: string;
  readonly databases: {
    readonly mongo: MongoDatabaseConfig;
  };
  readonly authConfig: JWTConfig;
  readonly port: number;
}
