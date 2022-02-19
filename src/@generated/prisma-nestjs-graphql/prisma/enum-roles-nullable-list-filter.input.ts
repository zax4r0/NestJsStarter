import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Roles } from './roles.enum';

@InputType()
export class EnumRolesNullableListFilter {
  @Field(() => [Roles], { nullable: true })
  equals?: Array<keyof typeof Roles>;

  @Field(() => Roles, { nullable: true })
  has?: keyof typeof Roles;

  @Field(() => [Roles], { nullable: true })
  hasEvery?: Array<keyof typeof Roles>;

  @Field(() => [Roles], { nullable: true })
  hasSome?: Array<keyof typeof Roles>;

  @Field(() => Boolean, { nullable: true })
  isEmpty?: boolean;
}
