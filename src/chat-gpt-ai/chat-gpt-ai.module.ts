import { Module, forwardRef } from '@nestjs/common';
import { ChatGptAiService } from './chat-gpt-ai.service';
import { ChatGptAiController } from './chat-gpt-ai.controller';
import { MessagesModule } from 'src/messages/messages.module';
import { ChatGptAi } from './entities/chat-gpt-ai.entity';

@Module({
  // imports: [forwardRef(()=> MessagesModule)],
  controllers: [ChatGptAiController],
  providers: [ChatGptAiService],
  exports: [ChatGptAiService]
})
export class ChatGptAiModule {}
