import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
            private jwtService: JwtService    
        ){}

    async registration(userDto: CreateUserDto) {
        const catdidate = await this.userService.findUserByEmail(userDto.email)
        if (catdidate) {
            throw new BadRequestException('User with thie email is already in the system')
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5)
        console.log(hashPassword)
        const user = await this.userService.creatUser({...userDto, password: hashPassword})
        return this.generateToken(user)
    }

    private async generateToken(user: UserEntity) {
        const payload = {email: user.email, id: user.id, name: user.name}
        return {token: this.jwtService.sign(payload)}
    }

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.findUserByEmail(userDto.email)
        const passwordEquals = await bcrypt.compare(userDto.password, user.password)
        if(user && passwordEquals) {
            return user
        }
        throw new UnauthorizedException({message: 'incorrect email or password'})
    }
}
