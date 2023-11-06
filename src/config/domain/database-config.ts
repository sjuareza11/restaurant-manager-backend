import { MongoDatabaseConfig } from './mongo-database-config';

export interface DatabasesConfig {
  readonly mongo: MongoDatabaseConfig;
}
