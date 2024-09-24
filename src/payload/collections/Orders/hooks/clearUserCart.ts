import type { AfterChangeHook } from 'payload/dist/collections/config/types'

import type { Order } from '../../../payload-types'

export const clearUserCart: AfterChangeHook<Order> = async ({ doc, req, operation }) => {
  const { payload } = req

  if (operation === 'create' && doc.orderedBy) {
<<<<<<< HEAD
    const orderedBy = typeof doc.orderedBy === 'string' ? doc.orderedBy : doc.orderedBy.id
=======
    const orderedBy = typeof doc.orderedBy === 'object' ? doc.orderedBy.id : doc.orderedBy
>>>>>>> 2ad312393c380ac1bebb34b2fed6d8ee7538bde1

    const user = await payload.findByID({
      collection: 'users',
      id: orderedBy,
    })

    if (user) {
      await payload.update({
        collection: 'users',
        id: orderedBy,
        data: {
          cart: {
            items: [],
          },
        },
      })
    }
  }

  return
}
