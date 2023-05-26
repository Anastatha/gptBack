import { DialogueEntity } from "src/dialogues/entities/dialogues.entity";
import { MessageEntity } from "src/messages/entities/message.entity";
import { RolesEntity } from "src/roles/entities/role.entity";
import {Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity({name: 'users'})
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string

	@Column({unique: true})
	email: string;

	@Column()
	password: string

	@Column()
	premium: boolean

	@CreateDateColumn({name: 'created_at'})
	createdAt: Date;

	@UpdateDateColumn({name: 'updated_at'})
	updatedAt: Date;

	@OneToMany(() => DialogueEntity, dialogueEntity => dialogueEntity.user)
	dialogues: DialogueEntity[]

	@OneToMany(() => MessageEntity, messageEntity => messageEntity.user)
	messages: MessageEntity[]

	@OneToMany(() => RolesEntity, rolesEntity => rolesEntity.users)
    role: RolesEntity[]
}
