import { Controller, Get, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { EventPattern, ClientProxy } from '@nestjs/microservices';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { CacheTTL } from '@nestjs/cache-manager';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService
  ) {}

  @EventPattern('task_created')
  @CacheTTL(3600)
  async create(task) {
    try {
      return await this.tasksService.create(task);
    } catch (err) {
      return { message: err.message}
    }
  }

  @Get()
  async findAll(
    @Query() query: ExpressQuery
  ) {
    try {
      return await this.tasksService.findAll(query);
    } catch (err) {
      return { message: err.message}
    }
  }

  @Get('/tasknotification')
  taskNotification() {
    try {
      return this.tasksService.notification()
    } catch (err) {
      return { message: err.message };
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.tasksService.findOne(+id);
    } catch (err) {
      return { message: err.message}
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      return this.tasksService.update(+id, updateTaskDto);
    } catch (err) {
      return { message: err.message}
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.tasksService.remove(+id);
    } catch (err) {
      return { message: err.message }
    }
  }
}
