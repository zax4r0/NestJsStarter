import { registerEnumType } from '@nestjs/graphql';

export enum Roles {
    USER = "USER",
    ADMIN = "ADMIN"
}


registerEnumType(Roles, { name: 'Roles', description: undefined })
