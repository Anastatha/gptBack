import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { DialoguesService } from './dialogues.service';
import { MessagesService } from 'src/messages/messages.service';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('dialogues')
export class DialoguesController {
  constructor(private readonly dialoguesService: DialoguesService,
    private readonly messagesService: MessagesService
    ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async creteDialogue(@Request() req, @Body('roleId') roleId: number) {
    const userId = req.user.id
    return this.dialoguesService.creteDialogue(userId, roleId)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:id/messages')
  async creteMessage(@Request() req, @Param('id') id: number, @Body() dt: CreateMessageDto) {
    const userId = req.user.id
    return this.messagesService.createMessage(userId, id, dt)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id/messages')
  async getAllMessages(@Request() req, @Param('id') id: number) {
      const userId = req.user.id
      return this.messagesService.getAll(userId, id)
  }

  @Patch(':id')
  async updateDialogueRole(@Param('id') id: number, @Body('roleId') roleId: number) {
    return this.dialoguesService.updateDialogueRole(id, roleId)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: number) {
    return this.dialoguesService.getOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllDialogue(@Request() req) {
    const userId = req.user.id
    return this.dialoguesService.getAllDialogue(userId)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
    remoteOneDialogues(@Param('id') id: number) {
      return this.dialoguesService.remoteOneDialogues(id)
    }
}


