import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async creteMessage(@Body('') dt: CreateMessageDto) {
    return this.messagesService.createMessage(dt)
  }

  @Get('/user/:id/:dialogueId')
  async getAll(@Param('id') id: number, @Param('dialogueId') dialogueId: number) {
    return this.messagesService.getAll(id, dialogueId)
  }
}
