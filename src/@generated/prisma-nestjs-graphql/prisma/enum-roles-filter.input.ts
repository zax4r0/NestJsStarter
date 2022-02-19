import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Roles } from './roles.enum';
import { NestedEnumRolesFilter } from './nested-enum-roles-filter.input';

@InputType()
export class EnumRolesFilter {

    @Field(() => Roles, {nullable:true})
    equals?: keyof typeof Roles;

    @Field(() => [Roles], {nullable:true})
    in?: Array<keyof typeof Roles>;

    @Field(() => [Roles], {nullable:true})
    notIn?: Array<keyof typeof Roles>;

    @Field(() => NestedEnumRolesFilter, {nullable:true})
    not?: NestedEnumRolesFilter;
}
