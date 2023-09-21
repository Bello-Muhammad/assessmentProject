import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://vcxaamlr:2qU-Gs5REuY8-YAZ3schBE5rB_yhIAhM@rat.rmq2.cloudamqp.com/vcxaamlr'],
      queue: 'main_queue',
      queueOptions: {
        durable: false
      },
    },
  });

  app.listen();
}
bootstrap();
