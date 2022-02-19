import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApolloError } from 'apollo-server-express';
import { User } from 'src/@generated/prisma-nestjs-graphql/user/user.model';
import { compare, hash } from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { jwtSecret } from './constants';
import { isEmpty } from '../utils/util';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<User | null> {
    if (isEmpty({ email, password }))
      throw new HttpException("You're not userData", 400);

    const user = await this.usersService.getUserByEmail(email);

    if (!user) throw new HttpException(`You're email ${email} not found`, 404);

    const isPasswordMatching: boolean = await compare(password, user.password);
    if (!isPasswordMatching)
      throw new HttpException("You're password not matching", 401);

    return isPasswordMatching ? user : null;
  }

  login(user: User): { access_token: string } {
    const payload = {
      email: user.email,
      sub: user.id,
      // role: user.roles,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userData: User): Promise<User> {
    const findUser: User = await this.usersService.getUserByEmail(
      userData.email,
    );
    if (findUser)
      throw new HttpException(
        `You're email ${userData.email} already exists`,
        409,
      );
    const hashedPassword = await hash(userData.password, 10);
    const user = await this.usersService.createUser({
      email: userData.email,
      password: hashedPassword,
      // roles: userData.roles,
    });
    delete user['password'];
    delete user['roles'];
    return user;
  }

  async verify(token: string): Promise<User> {
    const decoded = this.jwtService.verify(token, {
      secret: jwtSecret,
    });

    const user = await this.usersService.getUserByEmail(decoded.email);

    if (!user) {
      throw new HttpException('Bad token', 401);
    }

    return user;
  }
}
