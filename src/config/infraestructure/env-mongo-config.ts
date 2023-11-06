const MONGODB_HOST = process.env.MONGODB_HOST || 'localhost';
const MONGODB_PORT = process.env.MONGODB_PORT || 27017;
const MONGODB_NAME = process.env.MONGODB_NAME || 'restaurant-manager-db';
const MONGODB_USERNAME = process.env.MONGODB_USERNAME || 'root';
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || 'root';

export const MONGO_CONFIG = {
  host: MONGODB_HOST,
  port: MONGODB_PORT,
  dbName: MONGODB_NAME,
  user: MONGODB_USERNAME,
  password: MONGODB_PASSWORD,
  defaultLimit: parseInt(process.env.DEFAULT_LIMIT) || 10,
};
