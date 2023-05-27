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
  findOne(@Request() req) {
    const id = req.user.id
    return this.usersService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/profile')
  userAddPremium(@Request() req) {
    const id = req.user.id
    return this.usersService.userAddPremium(id)
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
