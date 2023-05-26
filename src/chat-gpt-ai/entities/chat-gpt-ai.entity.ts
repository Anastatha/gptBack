import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class ChatGptAi {
    @IsString()
    @IsNotEmpty()
    question: string

    @IsString()
    @IsOptional()
    role: string

    // @IsString()
    // @IsOptional()
    // modelId: string

    // @IsNumber()
    // @IsOptional()
    // temperature: number

    // @IsNumber()
    // @IsOptional()
    // maxTokens: number
}
