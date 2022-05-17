/**
 * Author Moeid Heidari
 * Date 17 May 2022
 */
export enum Roles {
  /**
   * when the user has a Super admin role that provides the access to all the Superadmin guarded APIs.
   */
  Superadmin = 'Superadmin',
  /**
   * when the user has a Admin role that provides the access to all the Admin guarded APIs.
   * It is more restricted than Superadmin role. Superadmin user can provide such a role to the user.
   */
  Admin = 'Admin',
  /**
   * when the user has a User role that provides the access to all the User guarded APIs.
   * It is more restricted than Admin role. Admin user can provide such a role to a user.
   */
  User = 'User',
  /**
   * It is a role which is associated to all the users (even non-authorized users). It provides
   * some APIs that are going to feed public requirements.
   */
  Public = 'Public',
}
