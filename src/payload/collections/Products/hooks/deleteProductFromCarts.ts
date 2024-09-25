import type { AfterDeleteHook } from 'payload/dist/collections/config/types'; 
import type { Product, User } from '../../../payload-types'; // Ensure User is imported if needed

export const deleteProductFromCarts: AfterDeleteHook<Product> = async ({ req, id }) => {
  // Ensure 'id' is valid before proceeding
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

  // Check if users are found
  if (usersWithProductInCart.totalDocs > 0) {
    await Promise.all(
      usersWithProductInCart.docs.map(async (user) => {
        // Ensure user and their cart are defined
        if (user && user.cart) {
          const cart = user.cart;

          // Ensure cart items are an array
          if (Array.isArray(cart.items)) {
            const itemsWithoutProduct = cart.items.filter(item => item.product !== id);
            const cartWithoutProduct = {
              ...cart,
              items: itemsWithoutProduct,
            };

            // Ensure user.id is a valid string
            if (typeof user.id === 'string') {
              await req.payload.update({
                collection: 'users',
                id: user.id,
                data: {
                  cart: {
                    items: cartWithoutProduct.items, // Ensure this matches User type
                    // Add any other properties from the cart as needed
                    // e.g., totalAmount: cartWithoutProduct.totalAmount
                  },
                },
              });
            }
          }
        }
      }),
    );
  }
};
