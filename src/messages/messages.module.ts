import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './entities/message.entity';
import { ChatGptAiModule } from 'src/chat-gpt-ai/chat-gpt-ai.module';
import { DialoguesModule } from 'src/dialogues/dialogues.module';
import { RolesEntity } from 'src/roles/entities/role.entity';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity, RolesEntity]), ChatGptAiModule, DialoguesModule, RolesModule],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService]
})
export class MessagesModule {}
