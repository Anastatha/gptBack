import { DialogueEntity } from "src/dialogues/entities/dialogues.entity";
import { UserEntity } from "src/users/entities/user.entity";
import {Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity({name: 'messages'})
export class MessageEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({nullable:true})
    role: string 
	
	@Column()
	content: string

	@Column()
	userId: number

	@Column()
	dialogueId: number

	@CreateDateColumn({name: 'created_at'})
	createdAt: Date;

	@UpdateDateColumn({name: 'updated_at'})
	updatedAt: Date;

    @ManyToOne(() => DialogueEntity, dialogueEntity => dialogueEntity.messages)
    dialogue: DialogueEntity

	@ManyToOne(() => UserEntity, userEntity => userEntity.messages)
	user: UserEntity
}