import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import cors from 'cors';
import { CommonRoutesConfig } from './modules/common/common.routes.config';
import debug from 'debug';
import logger from './utilities/logger';
import helmet from 'helmet';

/**
 * Import routes
 */
import { AuthRoutes } from './modules/auth/auth.routes.config';
import { UsersRoutes } from './modules/users/users.routes.config';
import { CollectionsRoutes } from './modules/collections/collection.routes.config';
import { UploadRoutes } from './modules/uploads/upload.routes.config';

const app: Application = express();
const port = process.env.PORT || 8484;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

app.use(cors());
app.use(express.json());
app.use(helmet());

app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send('Server is up and running... Noice!');
});

/**
 * Implement routes
 */
routes.push(new UsersRoutes(app));
routes.push(new AuthRoutes(app));
routes.push(new CollectionsRoutes(app));
routes.push(new UploadRoutes(app));

app.listen(port, async () => {
  logger.info(`server started on http://localhost:${port}`);
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
});
