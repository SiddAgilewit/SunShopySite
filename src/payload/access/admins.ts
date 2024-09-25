import type { AccessArgs } from 'payload/config';
import { checkRole } from '../collections/Users/checkRole';
import type { User } from '../payload-types';

type IsAdmin = (args: AccessArgs<unknown, User>) => boolean;

export const admins: IsAdmin = ({ req: { user } }) => {
  // Check if user is defined before checking the role
  if (!user) {
    return false; // Or handle the case when user is not defined
  }
  
  return checkRole(['admin'], user);
};
