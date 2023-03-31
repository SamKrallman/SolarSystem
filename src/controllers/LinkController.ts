import { Request, Response } from 'express';
import { logIn } from './UserController';
import { getUserById } from '../models/UserModel';
import { parseDatabaseError } from '../utils/db-utils';
import { createNewLink, getLinkById, updateLinkVisits } from '../models/LinkModel';
import { LinkParam, NewLinkRequest, UserParam } from '../types/user';

async function shortenUrl(req: Request, res: Response): Promise<void> {
  if (!logIn) {
    res.sendStatus(401);
    return;
  }

  // Get the userId from `req.session`
  const { userId } = req.session;
  const { originalURL } = req.param as unknown as NewLinkRequest;
  const { isPro, isAdmin, links } = req.param as unknown as UserParam;

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
    const newLink = createNewLink(orginalURL, linkId, user);
    console.log(newLink);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err as Error);
    res.status(500).json(databaseErrorMessage);
  }
}

async function getOriginalUrl(req: Request, res: Response): Promise<void> {
  const { originalURL } = req.params as NewLinkRequest;
  const { linkId } = req.params as LinkParam;
  let link = await getLinkById(linkId);
  if (!link) {
    res.sendStatus(404);
    return;
  }

  // Call the appropriate function to increment the number of hits and the last accessed date
  link = await updateLinkVisits(link);
  // Redirect the client to the original URL
  res.redirect(301, originalURL);
}

export { shortenUrl, getOriginalUrl };
