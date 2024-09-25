import type { User } from '../../payload-types';

export const checkRole = (allRoles: User['roles'] = [], user?: User): boolean => {
  if (user && user.roles) { // Ensure user and user.roles are defined
    return allRoles.some(role => {
      return user.roles.some(individualRole => {
        return individualRole === role;
      });
    });
  }

  return false; 
};
