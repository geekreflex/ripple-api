import mongoose from 'mongoose';
import logger from '../../../utilities/logger';

class MongooseService {
  private count = 0;

  constructor() {
    this.connectWithRetry();
  }

  getMongoose() {
    return mongoose;
  }

  connectWithRetry = async () => {
    logger.info('Connecting to MongoDB (will retry if needed)');
    try {
      await mongoose.connect('mongodb://localhost:27017/ripple-db');
      logger.info('MongoDB connected');
    } catch (error) {
      const retrySeconds = 5;
      logger.info(
        `MongoDb connection unsuccessful (will retry #${++this
          .count} after ${retrySeconds} seconds):`,
        error
      );
      setTimeout(this.connectWithRetry, retrySeconds * 1000);
    }
  };
}

export default new MongooseService();
