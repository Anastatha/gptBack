import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { DialoguesService } from './dialogues.service';
import { CreateDialogueDto } from './dto/crete-dialogue.dto';

@Controller('dialogues')
export class DialoguesController {
  constructor(private readonly dialoguesService: DialoguesService) {}

  @Post()
  async creteDialogue(@Body() dto: CreateDialogueDto) {
    return this.dialoguesService.creteDialogue(dto)
  }

  @Patch(':id')
  async updateDialogueRole(@Param('id') id: number, @Body('roleId') roleId: number) {
    return this.dialoguesService.updateDialogueRole(id, roleId)
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return this.dialoguesService.getOne(id)
  }

  @Get()
  async getAllGialogue() {
    return this.dialoguesService.getAllGialogue()
  }
}
