import { Config } from './config.ts';

const { Server } = await import('./server.ts');

Config.init();
await Server.start();
