import type { PayloadHandler } from 'payload/config';
import type { PayloadRequest } from 'payload/types';
import Stripe from 'stripe';

import { checkRole } from '../collections/Users/checkRole';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2022-08-01',
});

const logs = process.env.LOGS_STRIPE_PROXY === '1';

// Use this handler to get all Stripe customers
// Prevents unauthorized or non-admin users from accessing all Stripe customers
// GET /api/customers
export const customersProxy: PayloadHandler = async (req: PayloadRequest, res) => {
  if (!req.user || !checkRole(['admin'], req.user)) {
    if (logs) req.payload.logger.error({ err: 'You are not authorized to access customers' });
    return res.status(401).json({ error: 'You are not authorized to access customers' });
  }

  const customerId = req.user.stripeCustomerID; // Ensure req.user exists

  if (!customerId) {
    return res.status(400).json({ error: 'Customer ID is required' });
  }

  try {
    const customers = await stripe.customers.list({
      limit: 100,
    });

    res.status(200).json(customers);
  } catch (error: unknown) {
    if (logs) req.payload.logger.error({ err: `Error using Stripe API: ${error}` });
    res.status(500).json({ error: `Error using Stripe API: ${error instanceof Error ? error.message : 'Unknown error'}` });
  }
};
