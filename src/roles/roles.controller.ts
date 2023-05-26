import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService){}

  @Post()
  create(@Body() dto: CreateRoleDto) {
      return this.rolesService.createRole(dto)
  }
}