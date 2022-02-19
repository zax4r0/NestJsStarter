import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Roles } from './roles.enum';
import { NestedEnumRolesWithAggregatesFilter } from './nested-enum-roles-with-aggregates-filter.input';
import { NestedIntFilter } from './nested-int-filter.input';
import { NestedEnumRolesFilter } from './nested-enum-roles-filter.input';

@InputType()
export class EnumRolesWithAggregatesFilter {

    @Field(() => Roles, {nullable:true})
    equals?: keyof typeof Roles;

    @Field(() => [Roles], {nullable:true})
    in?: Array<keyof typeof Roles>;

    @Field(() => [Roles], {nullable:true})
    notIn?: Array<keyof typeof Roles>;

    @Field(() => NestedEnumRolesWithAggregatesFilter, {nullable:true})
    not?: NestedEnumRolesWithAggregatesFilter;

    @Field(() => NestedIntFilter, {nullable:true})
    _count?: NestedIntFilter;

    @Field(() => NestedEnumRolesFilter, {nullable:true})
    _min?: NestedEnumRolesFilter;

    @Field(() => NestedEnumRolesFilter, {nullable:true})
    _max?: NestedEnumRolesFilter;
}
