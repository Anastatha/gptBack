import { MessageEntity } from "src/messages/entities/message.entity";
import { RolesEntity } from "src/roles/entities/role.entity";
import { UserEntity } from "src/users/entities/user.entity";
import {Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, OneToMany, ManyToOne} from "typeorm";

@Entity({name: 'dialogues'})
export class DialogueEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({nullable: true})
	roleId: number

	@Column()
	userId: number

	@CreateDateColumn({name: 'created_at'})
	createdAt: Date;

	@UpdateDateColumn({name: 'updated_at'})
	updatedAt: Date;

	@OneToMany(() => MessageEntity, messageEntity => messageEntity.dialogue, {onDelete: 'CASCADE'})
	messages: MessageEntity[]
    
	@ManyToOne(() => UserEntity, userEntity => userEntity.dialogues)
    user: UserEntity

	@ManyToOne(() => RolesEntity,  rolesEntity => rolesEntity.dialogue)
	role: RolesEntity 
}
