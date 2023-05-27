import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService){}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() dto: CreateRoleDto) {
    const userId = req.user.id
    return this.rolesService.createRole(userId, dto)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getRole(@Request() req) {
    const userId = req.user.id
    return this.rolesService.getRole(userId)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getOneRole(@Param('id') id: number) {
    return this.rolesService.findOneRole(id)
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remoteOneRole(@Request() req, @Body('id') id: number) {
    const userId = req.user.id
    return this.rolesService.remoteOneRole(id, userId)
  }
}