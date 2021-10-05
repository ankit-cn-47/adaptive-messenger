import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { initAdapters } from './app/adapters.init';
import { AppModule } from './app/app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());

  initAdapters(app);

  await app.listen(3000, () => {
    console.log(`Listening on port 3000.`);
  });
}

bootstrap();
