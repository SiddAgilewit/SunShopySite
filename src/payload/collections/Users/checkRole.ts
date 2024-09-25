import type { User } from '../../payload-types';

export const checkRole = (allRoles: User['roles'] = [], user?: User): boolean => {
  // Check if allRoles is defined and is an array
  if (Array.isArray(allRoles)) {
    // Ensure user is defined and has roles, and that user.roles is an array
    if (user && Array.isArray(user.roles)) {
      // Check if user has any of the specified roles
      return allRoles.some(role => user.roles?.includes(role) ?? false);
    }
  }

  return false; // Return false if allRoles is not an array or user has no roles
};
