import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import cors from 'cors';
import { CommonRoutesConfig } from './modules/common/common.routes.config';
import { UsersRoutes } from './modules/users/users.routes.config';
import debug from 'debug';
import logger from './utilities/logger';
import { AuthRoutes } from './modules/auth/auth.routes.config';

const app: Application = express();
const port = 8484;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

app.use(cors());
app.use(express.json());

routes.push(new UsersRoutes(app));
routes.push(new AuthRoutes(app));

app.listen(port, async () => {
  logger.info(`server started on http://localhost:${port}`);
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
});
