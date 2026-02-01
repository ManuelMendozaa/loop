import { Config } from '@/config';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import mongoose from 'mongoose';

declare module 'fastify' {
  interface FastifyInstance {
    db: Database;
  }
}

class Database {
  async connect() {
    try {
      mongoose.set('strictQuery', false);

      console.log(Config.env.DATABASE);
      await mongoose.connect(String(Config.env.DATABASE)).then((conn) => {
        console.log('🍃 Connected to Mongo Database');
        return conn;
      });

      mongoose.connection.on('error', (err) => `❌🤬❌🤬 ${err}`);

      return { success: true };
    } catch (error) {
      console.error('❌ Error connecting to database');
      return { success: false };
    }
  }

  async disconnect() {
    if (!mongoose.connection) return;

    try {
      await mongoose.connection.close();
      console.log('🍂 Disconnected from Mongo Database');
      return { success: true };
    } catch (error) {
      console.error('❌ Error disconnecting from database');
      return { success: false };
    }
  }
}

export default fp(
  (fastify: FastifyInstance, _, done) => {
    const database = new Database();
    fastify.decorate('db', database);

    fastify.addHook('onClose', async () => {
      await fastify.db.disconnect();
    });

    database
      .connect()
      .then(() => done())
      .catch((err) => {
        console.error('❌ Database connection failed', err);
      });
  },
  { name: 'db' }
);
