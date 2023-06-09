import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authServer: AuthService){}

    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authServer.login(userDto)
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authServer.registration(userDto)
    }
}