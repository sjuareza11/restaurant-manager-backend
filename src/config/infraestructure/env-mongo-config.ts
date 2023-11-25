export const envMongoConfig = () => ({
  mongoProtocol: process.env.MONGODB_PROTOCOL || 'mongodb://',
  host: process.env.MONGODB_HOST || 'localhost:27017',
  dbName: process.env.MONGODB_USERNAME || 'root',
  user: process.env.MONGODB_NAME || 'restaurant-manager-db',
  password: process.env.MONGODB_PASSWORD || 'root',
});
