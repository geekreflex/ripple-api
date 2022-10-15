import { Request, Response } from 'express';
import logger from '../utils/logger';

export async function createUserHandler(req: Request, res: Response) {
  try {
    // const user = await
  } catch (e) {
    logger.error(e);
    return res.status(409);
  }
}
