import { DialogueEntity } from "src/dialogues/entities/dialogues.entity";
import { UserEntity } from "src/users/entities/user.entity";
import {Column, Entity, PrimaryGeneratedColumn, ManyToMany, OneToMany, OneToOne, ManyToOne} from "typeorm";

@Entity({name: 'roles'})
export class RolesEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({unique: true})
	name: string

	@Column({unique: true})
	value: string;

	@OneToMany(() => DialogueEntity, dialogueEntity => dialogueEntity.role)
	dialogue: DialogueEntity[]

	@ManyToOne(() => UserEntity, userEntity => userEntity.role)
    users: UserEntity
}
