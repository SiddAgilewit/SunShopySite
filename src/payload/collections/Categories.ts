import type { CollectionConfig } from 'payload/types'

const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
<<<<<<< HEAD
      required: true,
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
=======
>>>>>>> 2ad312393c380ac1bebb34b2fed6d8ee7538bde1
    },
  ],
}

export default Categories
