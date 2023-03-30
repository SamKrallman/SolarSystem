import { AppDataSource } from '../dataSource';
import { Link } from '../entities/Link';

const linkRepository = AppDataSource.getRepository(Link);

async function getLinkById(linkId: string): Promise<Link | null> {
  const link = await linkRepository.findOne({
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

export { getLinkById };
