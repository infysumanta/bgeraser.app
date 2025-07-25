import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';

import { dbClient } from '@/db';
import { env } from '@/env';

export const auth = betterAuth({
  database: mongodbAdapter(dbClient),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      prompt: 'select_account',
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
    microsoft: {
      clientId: env.MICROSOFT_CLIENT_ID,
      clientSecret: env.MICROSOFT_CLIENT_SECRET,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      allowDifferentEmails: true,
      trustedProviders: ['google', 'github', 'microsoft'],
    },
  },
  baseURL: env.AUTH_URL,
  secret: env.AUTH_SECRET,
  user: {
    additionalFields: {
      credits: {
        type: 'number',
        required: true,
        defaultValue: 3,
        input: true, // allow user to set role
      },
      paddleCustomerId: {
        type: 'string',
        required: false,
        defaultValue: null,
        input: true, // allow user to set role
      },
    },
  },
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
