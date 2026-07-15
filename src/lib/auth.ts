import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { jwt } from 'better-auth/plugins';

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db('KindCircle');

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  trustedOrigins: process.env.TRUSTED_ORIGINS
    ? process.env.TRUSTED_ORIGINS.split(',').map((o) => o.trim())
    : [],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: true,
        defaultValue: 'supporter',
      },
      credits: {
        type: 'number',
        required: true,
        defaultValue: 50,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const credits = user.role === 'creator' ? 20 : 50;
          return {
            data: {
              ...user,
              credits,
            },
          };
        },
      },
    },
  },
  plugins: [jwt()],
});
