import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
      return this.usersService.creatUser(userDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
      return this.usersService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
      return this.usersService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/profile')
  userAddPremium(@Body('email') email: string) {
    return this.usersService.userAddPremium(email)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/profile/:id')
  updateUser(@Param('id') id: number, @Body() updateDto: UpdateUserUserDto) {
    return this.usersService.updateUser(id, updateDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/remote/:id')
  remove(@Param('id') id:number) {
      return this.usersService.remove(id)
  }
}
