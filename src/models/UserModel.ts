import { User } from '../entities/User';

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

export { getUserByUsername, addNewUser };
