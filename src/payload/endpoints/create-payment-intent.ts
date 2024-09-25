import type { PayloadHandler } from 'payload/config';
import Stripe from 'stripe';
import type { CartItems } from '../payload-types';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2022-08-01',
});

// This endpoint creates a `PaymentIntent` with the items in the cart
export const createPaymentIntent: PayloadHandler = async (req, res): Promise<void> => {
  const { user, payload } = req;

  // Check if user is defined
  if (!user) {
    res.status(401).send('Unauthorized');
    return;
  }

  // Find the full user details
  const fullUser = await payload.findByID({
    collection: 'users',
    id: user.id,
  });

  // Check if user was found
  if (!fullUser) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  try {
    let stripeCustomerID = fullUser.stripeCustomerID;

    // Lookup user in Stripe and create one if not found
    if (!stripeCustomerID) {
      const customer = await stripe.customers.create({
        email: fullUser.email || '', // Provide a default value to avoid undefined
        name: fullUser.name || '', // Provide a default value to avoid undefined
      });

      stripeCustomerID = customer.id;

      // Update the user with the new Stripe customer ID
      await payload.update({
        collection: 'users',
        id: user.id,
        data: {
          stripeCustomerID,
        },
      });
    }

    let total = 0;

    // Safe check for cart and its items
    const cart = fullUser.cart || {}; // Use an empty object if cart is undefined
    const items: CartItems = cart.items || []; // Use an empty array if items is null or undefined

    // Ensure there are items in the cart
    if (items.length === 0) {
      throw new Error('No items in cart');
    }

    // Process each item in cart
    await Promise.all(
      items.map(async (item): Promise<void> => { // Here we let TypeScript infer the type
        const { product, quantity } = item;

        // Check if quantity is defined
        if (!quantity) {
          return; // Just return if no quantity
        }

        // Ensure product is a valid object and has a Stripe Product ID
        if (typeof product === 'string' || !product?.stripeProductID) {
          throw new Error('No Stripe Product ID');
        }

        // List prices for the product
        const prices = await stripe.prices.list({
          product: product.stripeProductID,
          limit: 100,
          expand: ['data.product'],
        });

        // Check if any prices were found
        if (prices.data.length === 0) {
          res.status(404).json({ error: 'There are no items in your cart to checkout with' });
          return; // Early return if no prices found
        }

        const price = prices.data[0];
        total += (price.unit_amount || 0) * (quantity || 0); // Use default values to avoid NaN

        return; // Just return to match the expected type
      }),
    );

    // Check if total is zero
    if (total === 0) {
      throw new Error('There is nothing to pay for, add some items to your cart and try again.');
    }

    // Create the PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      customer: stripeCustomerID,
      amount: total,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    res.send({ client_secret: paymentIntent.client_secret });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    payload.logger.error(message);
    res.json({ error: message });
  }
};
