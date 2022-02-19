import { Inject, Logger, LoggerService, UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserCreateInput } from 'src/@generated/prisma-nestjs-graphql/user/user-create.input';
import { CurrentUser } from '../auth/current-user.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UsersService } from './users.service';
import { User } from 'src/@generated/prisma-nestjs-graphql/user/user.model';
import { UserWhereUniqueInput } from 'src/@generated/prisma-nestjs-graphql/user/user-where-unique.input';
import { UserUpdateInput } from 'src/@generated/prisma-nestjs-graphql/user/user-update.input';
import { ACGuard, UseRoles } from '../auth/accesscontrol';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @Query(() => User, { name: 'Me', nullable: true })
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: User): Promise<User> {
    this.logger.log('Query:');
    return await this.usersService.getUser(user);
  }

  @Query(() => User, { name: 'GetUserById', nullable: true })
  @UseGuards(GqlAuthGuard, ACGuard)
  @UseRoles({
    possession: 'any',
    action: 'read',
    resource: 'usersById',
  })
  async getUser(@Args('id') getUserArgs: UserWhereUniqueInput): Promise<User> {
    return await this.usersService.getUser(getUserArgs);
  }

  @Query(() => [User], { name: 'GetAllUsers', nullable: 'items' })
  @UseGuards(GqlAuthGuard, ACGuard)
  @UseRoles({
    possession: 'any',
    action: 'read',
    resource: 'users',
  })
  async getUsers(): Promise<User[]> {
    const users = await this.usersService.getUsers();
    // console.log(users);
    return users;
  }

  @Mutation(() => User)
  async createUser(@Args('createUserData') createUserData: UserCreateInput) {
    return await this.usersService.createUser(createUserData);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('updateUserData') updateUserData: UserUpdateInput,
  ): Promise<User> {
    return await this.usersService.updateUser(updateUserData);
  }

  @Mutation(() => User)
  async deleteUser(
    @Args('deleteUserData') deleteUserData: UserWhereUniqueInput,
  ): Promise<User> {
    return await this.usersService.deleteUser(deleteUserData);
  }
}
