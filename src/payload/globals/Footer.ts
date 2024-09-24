import type { GlobalConfig } from 'payload/types'

import link from '../fields/link'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
<<<<<<< HEAD
      name: 'copyright',
      label: 'Copyright',
      type: 'text',
    },
    {
=======
>>>>>>> 2ad312393c380ac1bebb34b2fed6d8ee7538bde1
      name: 'navItems',
      type: 'array',
      maxRows: 6,
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
  ],
}
