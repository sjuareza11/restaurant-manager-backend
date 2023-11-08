import { EnviromentConfiguration } from '../domain/environment-configuration';
import { envAuthConfig } from './env-auth-config';
import { envMongoConfig } from './env-mongo-config';

export const envConfigBuilder: () => EnviromentConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  databases: {
    mongo: envMongoConfig(),
  },
  authConfig: envAuthConfig(),
  port: parseInt(process.env.PORT) || 3000,
  paginationDefaultLimit: parseInt(process.env.PAGINATION_DEFAULT_LIMIT) || 10,
  paginationDefaultOffset: parseInt(process.env.PAGINATION_DEFAULT_OFFSET) || 0,
});
