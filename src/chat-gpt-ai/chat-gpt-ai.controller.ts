import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ChatGptAiService } from './chat-gpt-ai.service';
import { CreateChatGptAiDto } from './dto/create-chat-gpt-ai.dto';
import { ChatGptAi } from './entities/chat-gpt-ai.entity';

@Controller('chat-gpt-ai')
export class ChatGptAiController {
  constructor(private readonly chatGptAiService: ChatGptAiService) {}

  // @Post('/message')
  // @UsePipes(ValidationPipe)
  // getAnswer(@Body() data: ChatGptAi) {
  //   return this.chatGptAiService.getAnswer(data)
  // }

  // @Get('/model')
  // listModels() {
  //   return this.chatGptAiService.listModels()
  // }

  // @Post('/model')
  // @UsePipes(ValidationPipe)
  // setModel(@Body() data: SetSelectedModel) {
  //   this.chatGptAiService.setModelId(data.modelId)
  // }
}
