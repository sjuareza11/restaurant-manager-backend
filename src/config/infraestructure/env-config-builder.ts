import { EnviromentConfiguration } from '../domain/environment-configuration';
import { AUTH_CONFIG } from './env-auth-config';
import { MONGO_CONFIG } from './env-mongo-config';
import {
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_DEFAULT_OFFSET,
} from './env-pagination-config';

export const envConfigBuilder: () => EnviromentConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  databases: {
    mongo: MONGO_CONFIG,
  },
  authConfig: AUTH_CONFIG,
  port: parseInt(process.env.PORT) || 3000,
  paginationDefaultLimit: PAGINATION_DEFAULT_LIMIT,
  paginationDefaultOffset: PAGINATION_DEFAULT_OFFSET,
});
