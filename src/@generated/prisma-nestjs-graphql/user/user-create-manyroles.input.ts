import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Roles } from '../prisma/roles.enum';

@InputType()
export class UserCreateManyrolesInput {
  @Field(() => [Roles], { nullable: false })
  set!: Array<keyof typeof Roles>;
}
