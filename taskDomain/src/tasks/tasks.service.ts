import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { Query } from 'express-serve-static-core';

@Injectable()
export class TasksService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(Task) private taskRepository: Repository<Task>, 
    ) {}
    private readonly freqAccessed: any[] = []

  async create(data) {

    const notify = {
      project: data.project,
      task: data.task
    };
    const newTask = await this.taskRepository.create(data);

    await this.cacheManager.set('notification', notify)

    return this.taskRepository.save(newTask);
  }

  async notification() {

    const date = new Date().toJSON().slice(0, 10)
    let deadline = date;
    const dueTask = await this.taskRepository.findOneBy({ deadline })
    const getNotification = await this.cacheManager.get('notification');

    const dueNotification = dueTask ? { message: 'This tasks have reach deadline', dueTask} : 'No due task';
    const taskNotification = getNotification ? {message: 'new task added', getNotification} : 'no new task';
    return {taskNotification, dueNotification};
  }

  async findAll(query: Query) {
    
    const currentPage = Number(query.page) || 1;
    const take = 5
    const skip = take * (currentPage - 1);

    return this.taskRepository.find({
      skip,
      take
    });
  }

  async findOne(id: number) {
    this.freqAccessed.push(id)
    const cacheData = await this.cacheManager.get(id.toString());

    // check if task with the "id" exist in cache
    if ( cacheData ) {
      return cacheData;
    };

    const task = await this.taskRepository.findOneBy({ id });

    if(!task) {
      throw new NotFoundException('No task found')
    }

    // cheching how frequent task with the "id" is been fecth 
    const result = (arr, item) => {
      const filteredArray = arr.filter((elm) => elm === item);
      return filteredArray.length;
    }

    const count = result(this.freqAccessed, id)

    // if same task is fectch more than two times task will be cached
    if(count > 2) {
      
      await this.cacheManager.set( id.toString(), task)
      return task;
    }

    return task;
  }


  async update(id: number, updateTaskDto: UpdateTaskDto) {
    
    const updatedTask = await this.findOne(id);

    if(!updatedTask) {
      throw new NotFoundException('Task to update not found')
    }
    
    return this.taskRepository.update(id, updateTaskDto);
  }

  async remove(id: number) {
    const task = await this.findOne(id);

    if(!task) {
      throw new NotFoundException('No task to remove')
    }

    return this.taskRepository.delete(task);
  }
}
