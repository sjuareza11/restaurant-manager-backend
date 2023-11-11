import { AuthConfig } from './auth-config.js';
import { EnvAWSConfig } from './env-aws-config.ts';
import { MongoDatabaseConfig } from './mongo-database-config';

export interface EnvironmentConfiguration {
  readonly environment: string;
  readonly databases: {
    readonly mongo: MongoDatabaseConfig;
  };
  readonly paginationDefaultLimit: number;
  readonly paginationDefaultOffset: number;
  readonly authConfig: AuthConfig;
  readonly awsConfig: EnvAWSConfig;
  readonly port: number;
}
