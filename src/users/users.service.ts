import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { User } from '@prisma/client';
import { UserCreateInput } from 'src/@generated/prisma-nestjs-graphql/user/user-create.input';
import { UserUpdateInput } from 'src/@generated/prisma-nestjs-graphql/user/user-update.input';
import { UserWhereUniqueInput } from 'src/@generated/prisma-nestjs-graphql/user/user-where-unique.input';
@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService, // 👈
  ) {}

  public async createUser(createUserData: UserCreateInput): Promise<User> {
    // console.log(createUserData);
    const user = await this.prisma.user.create({ data: createUserData });

    return user;
  }

  public async updateUser(updateUserData: UserUpdateInput): Promise<User> {
    const user = await this.prisma.user.update({
      where: {
        id: 'qqq',
      },
      data: [updateUserData],
    });

    return user;
  }

  public async getUser(getUserArgs: UserWhereUniqueInput): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: getUserArgs.id },
    });
    return user;
  }

  public async getUserByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    return user;
  }

  public async getUsers(): Promise<User[]> {
    const user = await this.prisma.user.findMany();
    // console.log(user);
    return user;
  }

  public async deleteUser(deleteUserData: UserWhereUniqueInput): Promise<User> {
    const user = await this.prisma.user.delete({
      where: { id: deleteUserData.id },
    });
    return user;
  }
}
