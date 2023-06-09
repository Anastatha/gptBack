import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from './entities/message.entity';
import { ChatGptAiService } from 'src/chat-gpt-ai/chat-gpt-ai.service';
import { DialoguesService } from 'src/dialogues/dialogues.service';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class MessagesService {
  constructor(@InjectRepository(MessageEntity) private messageRepo: Repository<MessageEntity>,
    private gptService: ChatGptAiService,
    private dialogueService: DialoguesService,
    private rolesService: RolesService
  ) {}
  async createMessage(id: number, dialogueId: number, dt: CreateMessageDto) {
    const history = []

    const dialogue = await this.dialogueService.getOne(dialogueId)
    const role = await this.rolesService.findOneRole(dialogue.roleId)
    if(dialogue.roleId) {
      history.push({role: "system", content: role.value})
    }

    const getHistory = await this.getAll(id, dialogueId)
    history.push(...getHistory)
    
    const questionRes = {
      role: 'user',
      content: dt.content,
      userId: id,
      dialogueId: dialogueId
    }

    const question = await this.messageRepo.create(questionRes)
    await this.messageRepo.save(question)
    history.push({role: "user", content: dt.content})

    const answer = await this.gptService.getAnswe(history)

    const messageRes = {
      role: "assistant",
      content: answer,
      userId: id,
      dialogueId: dialogueId
    }
    const messageSave =  await this.messageRepo.create(messageRes)
    await this.messageRepo.save(messageSave)

    return JSON.stringify(answer)
  }

  async getAll(userId: number, dialogueId: number) {
    const message = await this.messageRepo.find({
      where: {userId, dialogueId},
      select: {role: true, content: true},
    })
    return message
  }

}
