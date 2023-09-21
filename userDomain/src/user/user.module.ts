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
      urls: ['amqps://vcxaamlr:2qU-Gs5REuY8-YAZ3schBE5rB_yhIAhM@rat.rmq2.cloudamqp.com/vcxaamlr'],
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
