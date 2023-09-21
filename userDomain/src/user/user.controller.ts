import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy } from '@nestjs/microservices'
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject('USER_SERVICE') private readonly client: ClientProxy
    ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.create(createUserDto);
    } catch (err) {
      return { message: err.message }
    }
  }

  @Post('/createtask')
  createTask(@Body() createTaskDto: CreateTaskDto) {
    try {
      const task = createTaskDto;
    
      this.client.emit('task_created', task);
  
      return {...task, message: 'task to create sent to task domain'}
    } catch (err) {
      return { message: err.message }
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {

      return this.userService.findOne(+id);

    } catch (err) {

      return { message: err.message}
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {

      return this.userService.update(+id, updateUserDto);
    } catch (err) {

      return { message: err.message }
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      
      return this.userService.remove(+id);
    } catch (err) {

      return { message: err.message }
    }
  }


}
