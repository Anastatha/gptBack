import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { RolesEntity } from './entities/role.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesService {
    constructor(@InjectRepository(RolesEntity) private roleRepo: Repository<RolesEntity>,
        private usersService: UsersService
    ) {}

    async createRole(id:number, dto: CreateRoleDto) {
        const user = await this.usersService.findOne(id)
        if(user.premium == false) {
            console.log(user.premium)
            throw new BadRequestException('not')
        } else {
            const role = await this.roleRepo.create(dto)
            role.users = user
            return this.roleRepo.save(role)
        }        
    }

    async findAllRole() {
        const roles = await this.roleRepo.find()
        return roles
    }

    async findOneRole(id: number) {
        const role = await this.roleRepo.findOne({where: {id}})
        return role
    }

    async getRole(userId: number) {
        const role = await this.roleRepo.find({
            relations: ['users'],
            where: {users: IsNull()}
        })

        const roleUser = await this.roleRepo.find({
            relations: {users: true},
            where: {users: {id: userId}}
        })
        const getRoles = [...role, ...roleUser]

        return getRoles
    }

    async remoteOneRole(id: number, userId: number) {
        const role = await this.roleRepo.findOne({
            relations: {users: true},
            where: {id: id, users: {id: userId}}
        })

        return this.roleRepo.remove(role)
    }
}
