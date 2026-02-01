import path from 'path';
import Fastify from 'fastify';
import fastifyAutoload from '@fastify/autoload';
import { Config } from './config';

const __dirname = `${path.resolve()}/src`;

export class Server {
  private static instance: Server;
  private static port: number;
  private static host: string;

  private constructor() {
    Server.port = Number(Config.env.PORT || 3000);
    Server.host = Config.env.SERVER_HOST || '0.0.0.0';
  }

  static async start() {
    if (Server.instance) return Server.instance;

    Server.instance = new Server();
    await this.createServer();
  }

  static async createServer() {
    const fastify = Fastify();

    await fastify.register(fastifyAutoload, {
      dir: path.join(__dirname, 'plugins/errors'),
    });
    await fastify.register(fastifyAutoload, {
      dir: path.join(__dirname, 'plugins/middlewares'),
    });
    await fastify.register(fastifyAutoload, {
      dir: path.join(__dirname, 'plugins/integrations'),
    });
    await fastify.register(fastifyAutoload, {
      dir: path.join(__dirname, 'plugins/routes'),
      prefix: '/api',
    });

    await fastify.ready();
    await fastify.listen({ port: Server.port, host: Server.host }).then(() => {
      console.log(
        `🚀 Server listening on http://${Server.host}:${Server.port}`
      );
    });
  }
}
