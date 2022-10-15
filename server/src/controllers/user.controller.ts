import { Request, Response } from 'express';
import { RegisterUserInput } from '../schema/user.schema';
import { createUser } from '../services/user.service';
import logger from '../utils/logger';

export async function registerUserHandler(
  req: Request<{}, {}, RegisterUserInput['body']>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.send({ success: true, payload: user });
  } catch (e) {
    logger.error(e);
    return res.status(409);
  }
}
