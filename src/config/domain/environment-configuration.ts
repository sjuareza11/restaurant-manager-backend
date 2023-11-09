import { EnvAWSConfig } from './env-aws-config.ts';
import { JWTConfig } from './jwt-config';
import { MongoDatabaseConfig } from './mongo-database-config';

export interface EnviromentConfiguration {
  readonly environment: string;
  readonly databases: {
    readonly mongo: MongoDatabaseConfig;
  };
  readonly paginationDefaultLimit: number;
  readonly paginationDefaultOffset: number;
  readonly authConfig: JWTConfig;
  readonly awsConfig: EnvAWSConfig;
  readonly port: number;
}
