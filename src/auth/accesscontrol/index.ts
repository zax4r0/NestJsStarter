/*--------------------------------------------------------------
 *  Copyright 2018 (c) Shady Khalifa (@shekohex).
 *  Licensed under the MIT License.
 *  All rights reserved.
 *-------------------------------------------------------------*/

export * from './decorators';
export * from './access-control.module';
export * from './roles-builder.class';
export * from './role.interface';
export * from './access-control.guard';
export type {
  Access,
  IAccessInfo,
  Query,
  IQueryInfo,
  Permission,
  AccessControlError,
} from 'accesscontrol';
export { ROLES_BUILDER_TOKEN } from './constants';
