import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RolesEntity } from './roles/entities/role.entity';
import { RolesModule } from './roles/roles.module';
import { UserEntity } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { DialoguesModule } from './dialogues/dialogues.module';
import { ChatGptAiModule } from './chat-gpt-ai/chat-gpt-ai.module';
import { MessagesModule } from './messages/messages.module';
import { MessageEntity } from './messages/entities/message.entity';
import { DialogueEntity } from './dialogues/entities/dialogues.entity';

@Module({
  imports: [
    ChatGptAiModule,
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [UserEntity, RolesEntity, MessageEntity, DialogueEntity],
      synchronize: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    DialoguesModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
