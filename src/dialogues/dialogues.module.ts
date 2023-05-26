import { Module } from '@nestjs/common';
import { DialoguesService } from './dialogues.service';
import { DialoguesController } from './dialogues.controller';
import { DialogueEntity } from './entities/dialogues.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([DialogueEntity]), RolesModule],
  controllers: [DialoguesController],
  providers: [DialoguesService],
  exports: [DialoguesService]
})
export class DialoguesModule {}
