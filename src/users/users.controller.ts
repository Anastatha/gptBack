import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
      return this.usersService.creatUser(userDto)
  }

  @Get()
  findAll() {
      return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
      return this.usersService.findOne(id)
  }

  @Patch('/profile')
  userAddPremium(@Body('email') email: string) {
    return this.usersService.userAddPremium(email)
  }

  @Patch('/profile/:id')
  updateUser(@Param('id') id: number, @Body() updateDto: UpdateUserUserDto) {
    return this.usersService.updateUser(id, updateDto)
  }

  @Delete('/remote/:id')
  remove(@Param('id') id:number) {
      return this.usersService.remove(id)
  }
}
