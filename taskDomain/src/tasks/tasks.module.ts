import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { RedisCacheModule } from '../redis-cache/redis-cache.modul';

@Module({
  imports: [TypeOrmModule.forFeature([Task]),
  RedisCacheModule
],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
