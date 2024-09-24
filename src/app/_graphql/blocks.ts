<<<<<<< HEAD
import { PRODUCT_CATEGORIES } from './categories'
=======
import { CATEGORIES } from './categories'
>>>>>>> 2ad312393c380ac1bebb34b2fed6d8ee7538bde1
import { LINK_FIELDS } from './link'
import { MEDIA } from './media'
import { META } from './meta'

export const CALL_TO_ACTION = `
...on Cta {
  blockType
  invertBackground
  richText
  links {
    link ${LINK_FIELDS()}
  }
}
`

export const CONTENT = `
...on Content {
  blockType
  invertBackground
  columns {
    size
    richText
    enableLink
    link ${LINK_FIELDS()}
  }
}
`

export const MEDIA_BLOCK = `
...on MediaBlock {
  blockType
  invertBackground
  position
  ${MEDIA}
}
`

export const ARCHIVE_BLOCK = `
...on Archive {
  blockType
  introContent
  populateBy
  relationTo
<<<<<<< HEAD
  ${PRODUCT_CATEGORIES}
=======
  ${CATEGORIES}
>>>>>>> 2ad312393c380ac1bebb34b2fed6d8ee7538bde1
  limit
  selectedDocs {
    relationTo
    value {
      ...on Product {
        id
        slug
        title
        priceJSON
<<<<<<< HEAD
=======
        ${META}
>>>>>>> 2ad312393c380ac1bebb34b2fed6d8ee7538bde1
      }
    }
  }
  populatedDocs {
    relationTo
    value {
      ...on Product {
        id
        slug
        title
        priceJSON
<<<<<<< HEAD
        ${PRODUCT_CATEGORIES}
=======
        ${CATEGORIES}
>>>>>>> 2ad312393c380ac1bebb34b2fed6d8ee7538bde1
        ${META}
      }
    }
  }
  populatedDocsTotal
}
`
