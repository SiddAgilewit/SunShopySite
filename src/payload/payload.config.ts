import { webpackBundler } from '@payloadcms/bundler-webpack'; // bundler-import
import { mongooseAdapter } from '@payloadcms/db-mongodb'; // database-adapter-import
import { payloadCloud } from '@payloadcms/plugin-cloud';
import nestedDocs from '@payloadcms/plugin-nested-docs';
import redirects from '@payloadcms/plugin-redirects';
import seo from '@payloadcms/plugin-seo';
import type { GenerateTitle } from '@payloadcms/plugin-seo/types';
import stripePlugin from '@payloadcms/plugin-stripe';
import { slateEditor } from '@payloadcms/richtext-slate'; // editor-import
import dotenv from 'dotenv';
import path from 'path';
import { buildConfig } from 'payload/config';

import Categories from './collections/Categories';
import { Media } from './collections/Media';
import { Orders } from './collections/Orders';
import { Pages } from './collections/Pages';
import Products from './collections/Products';
import Users from './collections/Users';
import BeforeDashboard from './components/BeforeDashboard';
import BeforeLogin from './components/BeforeLogin';
import { createPaymentIntent } from './endpoints/create-payment-intent';
import { customersProxy } from './endpoints/customers';
import { productsProxy } from './endpoints/products';
import { seed } from './endpoints/seed';
import { Footer } from './globals/Footer';
import { Header } from './globals/Header';
import { Settings } from './globals/Settings';
import { priceUpdated } from './stripe/webhooks/priceUpdated';
import { productUpdated } from './stripe/webhooks/productUpdated';

const generateTitle: GenerateTitle = () => {
  return 'My Store';
};

const mockModulePath = path.resolve(__dirname, './emptyModuleMock.js');

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

// Ensure the following variables are properly defined
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';
const databaseUri = process.env.DATABASE_URI || ''; // Default to an empty string if undefined
const serverUrl = process.env.PAYLOAD_PUBLIC_SERVER_URL || ''; // Default to an empty string if undefined
const stripeWebhookSecret = process.env.STRIPE_WEBHOOKS_SIGNING_SECRET || ''; // Default to an empty string if undefined

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(), // bundler-config
    components: {
      beforeLogin: [BeforeLogin],
      beforeDashboard: [BeforeDashboard],
    },
    webpack: (config) => {
      return {
        ...config,
        resolve: {
          ...config.resolve,
          alias: {
            ...config.resolve?.alias,
            dotenv: path.resolve(__dirname, './dotenv.js'),
            [path.resolve(__dirname, 'collections/Products/hooks/beforeChange')]: mockModulePath,
            [path.resolve(__dirname, 'collections/Users/hooks/createStripeCustomer')]: mockModulePath,
            [path.resolve(__dirname, 'collections/Users/endpoints/customer')]: mockModulePath,
            [path.resolve(__dirname, 'endpoints/create-payment-intent')]: mockModulePath,
            [path.resolve(__dirname, 'endpoints/customers')]: mockModulePath,
            [path.resolve(__dirname, 'endpoints/products')]: mockModulePath,
            [path.resolve(__dirname, 'endpoints/seed')]: mockModulePath,
            stripe: mockModulePath,
            express: mockModulePath,
          },
        },
      };
    },
  },
  editor: slateEditor({}), // editor-config
  db: mongooseAdapter({
    url: databaseUri,
  }),
  serverURL: serverUrl,
  collections: [Pages, Products, Orders, Media, Categories, Users],
  globals: [Settings, Header, Footer],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  cors: ['https://checkout.stripe.com', serverUrl].filter(Boolean),
  csrf: ['https://checkout.stripe.com', serverUrl].filter(Boolean),
  endpoints: [
    {
      path: '/create-payment-intent',
      method: 'post',
      handler: createPaymentIntent,
    },
    {
      path: '/stripe/customers',
      method: 'get',
      handler: customersProxy,
    },
    {
      path: '/stripe/products',
      method: 'get',
      handler: productsProxy,
    },
    {
      path: '/seed',
      method: 'get',
      handler: seed,
    },
  ],
  plugins: [
    stripePlugin({
      stripeSecretKey,
      isTestKey: Boolean(process.env.PAYLOAD_PUBLIC_STRIPE_IS_TEST_KEY), // Will be false if undefined
      stripeWebhooksEndpointSecret: stripeWebhookSecret,
      rest: false,
      webhooks: {
        'product.created': productUpdated,
        'product.updated': productUpdated,
        'price.updated': priceUpdated,
      },
    }),
    redirects({
      collections: ['pages', 'products'],
    }),
    nestedDocs({
      collections: ['categories'],
    }),
    seo({
      collections: ['pages', 'products'],
      generateTitle,
      uploadsCollection: 'media',
    }),
    payloadCloud(),
  ],
});
