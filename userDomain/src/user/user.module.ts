import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  ClientsModule.register([{
    name: 'USER_SERVICE',
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: 'main_queue',
      queueOptions: {
        durable: false,
      },
    }
  },
  ]),
],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
