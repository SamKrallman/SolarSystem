import { AppDataSource } from '../dataSource';
import { User } from '../entities/User';

const userRepository = AppDataSource.getRepository(User);

async function getUserByUsername(username: string): Promise<User | null> {
  const user = await userRepository.findOne({
    select: { username: true, userId: true },
    where: { username },
  });
  return user;
}

async function addNewUser(username: string, passwordHash: string): Promise<User | null> {
  let newUser = new User();
  newUser.username = username;
  newUser.passwordHash = passwordHash;
  newUser = await userRepository.save(newUser);
  return newUser;
}

async function getUserById(userId: string): Promise<User | null> {
  const user = await userRepository.findOne({
    select: {
      userId: true,
      username: true,
      isPro: true,
      isAdmin: true,
      links: true,
    },
    where: { userId },
  });
  return user;
}

export { getUserByUsername, addNewUser, getUserById };
