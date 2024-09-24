import type { FieldHook } from 'payload/types'

import type { User } from '../../../payload-types'

export const resolveDuplicatePurchases: FieldHook<User> = async ({ value, operation }) => {
  if ((operation === 'create' || operation === 'update') && value) {
    return Array.from(
      new Set(
<<<<<<< HEAD
        value?.map(purchase => (typeof purchase === 'string' ? purchase : purchase.id)) || [],
=======
        value?.map(purchase => (typeof purchase === 'object' ? purchase.id : purchase)) || [],
>>>>>>> 2ad312393c380ac1bebb34b2fed6d8ee7538bde1
      ),
    )
  }

  return
}
