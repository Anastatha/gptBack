import { Module } from '@nestjs/common';
import { ChatGptAiService } from './chat-gpt-ai.service';
import { ChatGptAiController } from './chat-gpt-ai.controller';

@Module({
  controllers: [ChatGptAiController],
  providers: [ChatGptAiService],
  exports: [ChatGptAiService]
})
export class ChatGptAiModule {}
