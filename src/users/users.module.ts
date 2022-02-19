import { Logger, Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  // imports: [PrismaModule],
  providers: [UsersResolver, UsersService, Logger],
  exports: [UsersService],
})
export class UsersModule {}
