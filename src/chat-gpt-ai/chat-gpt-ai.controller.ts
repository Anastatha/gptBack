import { Controller} from '@nestjs/common';
import { ChatGptAiService } from './chat-gpt-ai.service';

@Controller('chat-gpt-ai')
export class ChatGptAiController {
  constructor(private readonly chatGptAiService: ChatGptAiService) {}

}
