import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesEntity } from './entities/role.entity';

@Injectable()
export class RolesService {
    constructor(@InjectRepository(RolesEntity) private roleRepo: Repository<RolesEntity>,) {}

    async createRole(dto: CreateRoleDto) {
        const role = await this.roleRepo.create(dto)
        return this.roleRepo.save(role)
    }

    async findAllRole() {
        const roles = await this.roleRepo.find()
        return roles
    }

    async findOneRole(id: number) {
        const role = await this.roleRepo.findOne({where: {id}})
        return role
    }
}