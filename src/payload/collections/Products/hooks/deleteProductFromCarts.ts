import type { AfterDeleteHook } from 'payload/dist/collections/config/types';
import type { Product, User } from '../../../payload-types';

export const deleteProductFromCarts: AfterDeleteHook<Product> = async ({ req, id }) => {
  if (!id) {
    throw new Error('Invalid product ID');
  }

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
        if (user && user.cart && Array.isArray(user.cart.items)) {
          const itemsWithoutProduct = user.cart.items.filter(item => item.product !== id);
          const cartWithoutProduct = {
            ...user.cart,
            items: itemsWithoutProduct,
          };

          const updateData: Partial<User> = {
            id: user.id, // Ensure this is valid
            cart: cartWithoutProduct,
            name: user.name || null, // Ensure these fields are optional or provide defaults
            roles: user.roles || null,
            purchases: user.purchases || null,
          };

          await req.payload.update({
            collection: 'users',
            id: user.id,
            data: updateData,
          });
        }
      }),
    );
  }
};
