import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../.env' });

import { App } from './app/app';

const runApp = () => {
  const app = new App();
  app.listen(3000);
  console.log('run ok');
};

runApp();
