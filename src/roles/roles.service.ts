import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesEntity } from './entities/role.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesService {
    constructor(@InjectRepository(RolesEntity) private roleRepo: Repository<RolesEntity>,
        private usersService: UsersService
    ) {}

    async createRole(id:number, dto: CreateRoleDto) {
        const role = await this.roleRepo.create(dto)
        const user = await this.usersService.findOne(id)
        role.users = user
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
