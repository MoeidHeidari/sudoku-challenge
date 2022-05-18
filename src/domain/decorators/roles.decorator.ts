/**
 * Author Moeid Heidari
 * Date 17 May 2022
 */
import { SetMetadata } from '@nestjs/common';
import { Roles as Role } from '../enums';

/**
 * keys of roles
 */
export const ROLES_KEY = 'roles';
/**
 * retuns a list of defined roles
 * @param roles all the possible roles inside the enum
 * @returns the list of roles
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
