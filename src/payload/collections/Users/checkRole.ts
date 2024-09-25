import type { User } from '../../payload-types';

export const checkRole = (allRoles: User['roles'] = [], user?: User): boolean => {
  // Ensure user is defined and has roles
  if (user?.roles && Array.isArray(user.roles)) {
    return allRoles.some(role => 
      user.roles.includes(role) // Use includes for cleaner syntax
    );
  }

  return false; 
};
