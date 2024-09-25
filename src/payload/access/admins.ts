import type { AccessArgs } from 'payload/config';
import { checkRole } from '../collections/Users/checkRole';
import type { User } from '../payload-types';

type IsAdmin = (args: AccessArgs<unknown, User>) => boolean;

export const admins: IsAdmin = ({ req: { user } }) => {
  
  if (!user) {
    return false; 
  }
  
  return checkRole(['admin'], user);
};
