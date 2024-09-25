import type { PayloadHandler } from 'payload/config';
import type { PayloadRequest } from 'payload/types';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2022-08-01',
});

const logs = process.env.LOGS_STRIPE_PROXY === '1';

// use this handler to interact with a Stripe customer associated with any given user
export const customerProxy: PayloadHandler = async (req: PayloadRequest, res) => {
  const { userID } = req.params;

  if (!req.user) {
    if (logs) req.payload.logger.error({ err: `You are not authorized to access this customer` });
    return res.status(401).json({ error: 'You are not authorized to access this customer' });
  }

  const stripeCustomerID = req.user.stripeCustomerID;

  if (!stripeCustomerID) {
    const message = `No stripeCustomerID found for user ${userID}`;
    if (logs) req.payload.logger.error({ err: message });
    return res.status(401).json({ error: message });
  }

  try {
    let customer: Stripe.Customer | Stripe.DeletedCustomer | null;

    // Retrieve the customer from Stripe
    customer = await stripe.customers.retrieve(stripeCustomerID, {
      expand: ['invoice_settings.default_payment_method'],
    });

    if (!customer || customer.deleted) {
      return res.status(404).json({ error: `Customer ${stripeCustomerID} not found` });
    }

    // ensure the customer belongs to the user
    if (customer.id !== stripeCustomerID) {
      return res.status(401).json({ error: `You are not authorized to access this customer` });
    }

    if (req.method === 'GET') {
      return res.status(200).json(customer);
    }

    if (req.method === 'PATCH') {
      if (!req.body) {
        return res.status(400).json({ error: 'No customer data provided' });
      }

      // Validate the structure of req.body for allowed fields if necessary
      const updatedCustomer = await stripe.customers.update(stripeCustomerID, req.body);
      return res.status(200).json(updatedCustomer);
    }

    // Handle unsupported methods
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    if (logs) req.payload.logger.error({ err: `Error using Stripe API: ${error}` });
    return res.status(500).json({ error: `Error using Stripe API: ${error}` });
  }
};
