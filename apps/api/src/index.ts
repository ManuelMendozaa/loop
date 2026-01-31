import { Config } from './config';
import { Server } from './server';

async function startSystem() {
  Config.init();
  await Server.start();
}

startSystem();
