import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UpdateUserUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}
  async creatUser(dto: CreateUserDto) {
    const user = await this.userRepo.create(dto)
    user.premium = false
    return this.userRepo.save(user)
  }   

  async findAll() {
      const users = await this.userRepo.find()
      return users
  }

  async findOne(id: number) {
      const user = await this.userRepo.findOne({where: {id}})
      if(user) {
          return user
      }
      throw new NotFoundException(`User with ${id} not found`);
  }

  async findUserByEmail(email: string) {
    const user = this.userRepo.findOne({where: {email}})

    if (!user) {
      throw new NotFoundException(`User with ${email} not found`)
    }

    return user
  }

  async userAddPremium(email: string) {
    const user = await this.findUserByEmail(email)

    if (!user) {
      throw new NotFoundException(`User with ${email} not found`)
    }

    user.premium = true
    return this.userRepo.save(user)
  }

  async updateUser(id: number, userDto: UpdateUserUserDto) {
    const user = await this.findOne(id)

    if (!user) {
      throw new NotFoundException(`User with ${id} not found`)
    }

    Object.assign(user, userDto)
    return this.userRepo.save(user)
  }

  async remove(id: number) {
    const user = await this.findOne(id)
    return this.userRepo.remove(user) 
  }
}
