import { RolesBuilder } from './accesscontrol';

export enum AppRoles {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(AppRoles.USER) // define new or modify existing role. also takes an array.
  //   .createOwn('video') // equivalent to .createOwn('video', ['*'])
  .deleteOwn('users')
  .readAny('usersById')

  .grant(AppRoles.ADMIN) // switch to another role without breaking the chain
  .extend(AppRoles.USER)
  .readAny('users')
  .readAny(AppRoles.USER)
  .readAny(AppRoles.ADMIN) // inherit role capabilities. also takes an array
  .updateAny(
    'users',
    //   ['title']
  ) // explicitly defined attributes
  .deleteAny('users');
