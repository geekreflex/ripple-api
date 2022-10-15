import mongoose from 'mongoose';
import config from 'config';
import logger from '../src/utils/logger';

async function connectDB() {
  const dbUri = config.get<string>('dbUri');

  try {
    await mongoose.connect(dbUri);
    logger.info('DB Connected');
  } catch (error) {
    logger.error('Could not connect to DB');
    process.exit(1);
  }
}

export default connectDB;
