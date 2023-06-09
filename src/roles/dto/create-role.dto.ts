import {IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateRoleDto {
    @IsNotEmpty()
    @IsString()
    value: string

    @IsNotEmpty()
    @IsString()
    name: string
}