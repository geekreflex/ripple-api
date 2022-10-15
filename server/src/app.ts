import express from 'express';
import config from 'config';
import cors from 'cors';
import connectDB from '../config/db';
import logger from './utils/logger';

const app = express();
const port = config.get<number>('port');

app.use(cors());
app.use(express.json());

app.listen(port, async () => {
  logger.info(`server started on http://localhost:${port}`);
  await connectDB();
});
