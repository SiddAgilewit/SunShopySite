import { ARCHIVE_BLOCK, CALL_TO_ACTION, CONTENT, MEDIA_BLOCK } from './blocks'
<<<<<<< HEAD
import { PRODUCT_CATEGORIES } from './categories'
=======
import { CATEGORIES } from './categories'
>>>>>>> 2ad312393c380ac1bebb34b2fed6d8ee7538bde1
import { META } from './meta'

export const PRODUCTS = `
  query Products {
    Products(limit: 300) {
      docs {
        slug
      }
    }
  }
`

export const PRODUCT = `
  query Product($slug: String, $draft: Boolean) {
    Products(where: { slug: { equals: $slug}}, limit: 1, draft: $draft) {
      docs {
        id
        title
        stripeProductID
<<<<<<< HEAD
        ${PRODUCT_CATEGORIES}
=======
        ${CATEGORIES}
>>>>>>> 2ad312393c380ac1bebb34b2fed6d8ee7538bde1
        layout {
          ${CALL_TO_ACTION}
          ${CONTENT}
          ${MEDIA_BLOCK}
          ${ARCHIVE_BLOCK}
        }
        priceJSON
        enablePaywall
        relatedProducts {
          id
          slug
          title
          ${META}
        }
        ${META}
      }
    }
  }
`

export const PRODUCT_PAYWALL = `
  query Product($slug: String, $draft: Boolean) {
    Products(where: { slug: { equals: $slug}}, limit: 1, draft: $draft) {
      docs {
        paywall {
          ${CALL_TO_ACTION}
          ${CONTENT}
          ${MEDIA_BLOCK}
          ${ARCHIVE_BLOCK}
        }
      }
    }
  }
`
