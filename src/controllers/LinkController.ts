import { Request, Response } from 'express';
import { logIn } from './UserController';
import { getUserById } from '../models/UserModel';
import { parseDatabaseError } from '../utils/db-utils';
import { createNewLink } from '../models/LinkModel';

async function shortenUrl(req: Request, res: Response): Promise<void> {
  if (!logIn) {
    res.sendStatus(401);
    return;
  }

  // Get the userId from `req.session`
  const { userId } = req.session;

  const user = getUserById(userId);
  if (!user) {
    res.sendStatus(404);
    return;
  }

  if (!isPro || !isAdmin) {
    if (links.length === 5) {
      res.sendStatus(403);
      return;
    }
  }

  try {
    const newLink = createNewLink(orginalUrl, linkId, user);
    console.log(newLink);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err as Error);
    res.status(500).json(databaseErrorMessage);
  }
}

export { shortenUrl };
