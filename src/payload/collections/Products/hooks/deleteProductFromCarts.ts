import type { AfterDeleteHook } from 'payload/dist/collections/config/types';
import type { Product } from '../../../payload-types';

export const deleteProductFromCarts: AfterDeleteHook<Product> = async ({ req, id }) => {
  const usersWithProductInCart = await req.payload.find({
    collection: 'users',
    overrideAccess: true,
    where: {
      'cart.items.product': {
        equals: id,
      },
    },
  });

  if (usersWithProductInCart.totalDocs > 0) {
    await Promise.all(
      usersWithProductInCart.docs.map(async (user) => {
        const cart = user.cart;

        // Ensure cart and items are defined before proceeding
        if (cart && Array.isArray(cart.items)) {
          const itemsWithoutProduct = cart.items.filter(item => item.product !== id);
          const cartWithoutProduct = {
            ...cart,
            items: itemsWithoutProduct,
          };

          return req.payload.update({
            collection: 'users',
            id: user.id, // Ensure user.id is valid
            data: {
              cart: cartWithoutProduct,
            },
          });
        }
      }),
    );
  }
};
