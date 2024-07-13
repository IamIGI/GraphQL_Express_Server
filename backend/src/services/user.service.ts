import { PrismaClient, User } from '@prisma/client';
import { UserInput } from '../graphql/models/user.graphql.model';
async function getAllUser(prisma: PrismaClient): Promise<User[]> {
  try {
    return await prisma.user.findMany();
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getUserById(
  prisma: PrismaClient,
  id: string
): Promise<User | undefined> {
  try {
    const user = await prisma.user.findFirst({ where: { id } });
    if (!user) return undefined;

    return user;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function createUser(
  prisma: PrismaClient,
  data: UserInput
): Promise<User | undefined> {
  try {
    const createdUser = await prisma.user.create({
      data,
    });

    return createdUser;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

async function updateUser(
  prisma: PrismaClient,
  id: string,
  data: UserInput
): Promise<User | undefined> {
  try {
    const user = await getUserById(prisma, id);
    console.log(user);
    if (!user) {
      console.error('No user found');
      return undefined;
    }

    const updatedUser = prisma.user.update({ where: { id }, data });

    return updatedUser;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

async function deleteUser(
  prisma: PrismaClient,
  id: string
): Promise<User | undefined> {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id },
    });

    return deletedUser;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export default {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
