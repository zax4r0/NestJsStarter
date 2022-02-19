import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Roles } from './roles.enum';

@InputType()
export class EnumRolesFieldUpdateOperationsInput {

    @Field(() => Roles, {nullable:true})
    set?: keyof typeof Roles;
}
