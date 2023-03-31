import { Relation } from 'typeorm/common/RelationType';
import { Link } from '../entities/Link';

type NewUserRequest = {
  username: string;
  password: string;
};

type NewLinkRequest = {
  originalURL: string;
};

type LinkParam = {
  linkId: string;
};

type UserParam = {
  isPro: boolean;
  isAdmin: boolean;
  links: Relation<Link>[];
};
