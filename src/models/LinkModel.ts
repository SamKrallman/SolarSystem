import { createHash } from 'crypto';
import { AppDataSource } from '../dataSource';
import { Link } from '../entities/Link';
import { User } from '../entities/User';

const userRepository = AppDataSource.getRepository(Link);

async function getLinkById(linkId: string): Promise<Link | null> {
  const link = await userRepository.findOne({
    select: {
      linkId: true,
      originalUrl: true,
      lastAccessedOn: true,
      numHits: true,
      user: true,
    },
    where: { linkId },
  });
  return link;
}

function createLinkId(originalUrl: string, userId: string): string {
  const md5 = createHash('md5');
  md5.update(originalUrl + userId);
  const urlHash = md5.digest('base64url');
  const linkId = md5.slice(urlHash, 9);

  return linkId;
}

async function createNewLink(originalUrl: string, linkId: string, creator: User): Promise<Link> {
  const newLink = new Link();
  newLink.originalUrl = originalUrl;
  newLink.linkId = linkId;
  newLink.user = creator;
  return newLink;
}

async function updateLinkVisits(link: Link): Promise<Link> {
  const updatedLink = link;
  updatedLink.numHits += 1;
  const newDate = new Date();
  updatedLink.lastAccessedOn = newDate;

  await userRepository
    .createQueryBuilder()
    .update(Link)
    .set({ numHits: updatedLink.numHits })
    .where({ linkId: updatedLink.numHits })
    .set({ lastAccessedOn: updatedLink.lastAccessedOn })
    .where({ linkId: updatedLink.lastAccessedOn })
    .execute();

  return updatedLink;
}

export { getLinkById, createLinkId, createNewLink, updateLinkVisits };
