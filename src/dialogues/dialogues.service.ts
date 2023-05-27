import { Injectable } from '@nestjs/common';
import { DialogueEntity } from './entities/dialogues.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class DialoguesService {
    constructor(@InjectRepository(DialogueEntity) private dialogueRepo: Repository<DialogueEntity>,
    private rolesService: RolesService,
    ) {}

    async creteDialogue(userId: number, roleId: number) {
        const role = await this.rolesService.findOneRole(roleId)
        const dialogue = await this.dialogueRepo.create({userId: userId, name: role.name, roleId: role.id})
        return this.dialogueRepo.save(dialogue)
    }

    async updateDialogueRole(id: number, roleId: number) {
        const dialogue = await this.dialogueRepo.findOne({where: {id}})
        const role = await this.rolesService.findOneRole(roleId)
        
        dialogue.role = role
        return this.dialogueRepo.save(dialogue)
    }

    async getOne(id: number) {
        const dialogue = await this.dialogueRepo.findOne({where: {id}})
        return dialogue
    }

    async getAllDialogue(id: number) {
        const dialogue = await this.dialogueRepo.find({
            where: {userId: id}
        })
        return dialogue
    }
}
