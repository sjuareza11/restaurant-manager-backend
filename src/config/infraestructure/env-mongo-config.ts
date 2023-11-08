export const envMongoConfig = () => ({
  host: process.env.MONGODB_HOST || 'localhost',
  port: process.env.MONGODB_PORT || 27017,
  dbName: process.env.MONGODB_USERNAME || 'root',
  user: process.env.MONGODB_NAME || 'restaurant-manager-db',
  password: process.env.MONGODB_PASSWORD || 'root',
});
