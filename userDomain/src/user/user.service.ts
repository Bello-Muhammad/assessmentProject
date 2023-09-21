import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private usersRespository: Repository<User>,) {}
  
  async create(createUserDto: CreateUserDto) {
    const email = createUserDto.email;
    const checkUser = await this.usersRespository.findOneBy({ email })

    if (checkUser) {
      throw new NotFoundException('This user Exist already')
    }

    const newUser = this.usersRespository.create(createUserDto)
    return this.usersRespository.save(newUser);
  }

  findAll() {
    return this.usersRespository.find()
  }

  findOne(id: number) {

    const checkForUser = this.usersRespository.findOneBy({ id });

    if(!checkForUser) {
      throw new NotFoundException('User not found in record')
    }
    return checkForUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('This user do not exist in record')
    }

    return this.usersRespository.save({...user, ...updateUserDto});
  }

  async remove(id: number) {
    const user = await this.findOne(id)

    if(!user) {
      throw new NotFoundException('cant find user to remove')
    }

    return this.usersRespository.remove(user)
  }
}
