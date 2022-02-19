import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Roles } from './roles.enum';

@InputType()
export class UserCreaterolesInput {
  @Field(() => [Roles], { nullable: false })
  set!: Array<keyof typeof Roles>;
}
