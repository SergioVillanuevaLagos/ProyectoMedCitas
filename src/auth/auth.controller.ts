import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Auth, GetUser, RawHeaders } from './decorators';
import { RoleProtected } from './decorators/role-protected.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role.guard';
import { ValidRoles } from './interfaces/valid-roles';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    create(@Body() createUserDto: CreateUserDto) {
        return this.authService.create(createUserDto);
    }

    @Post('login')
    loginUser(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto);
    }

    @Get('check-status')
    @Auth()
    checkAuthStatus(@GetUser() user: User) {
        return this.authService.checkAuthStatus(user);
    }

    @Get('private')
    @UseGuards(AuthGuard())
    testingPrivateRoute(
        @GetUser() user: User,
        @GetUser('email') userEmail: string,
        @RawHeaders() rawHeaders: string[],
    ) {
        return {
            ok: true,
            message: 'This is a private route',
            user,
            userEmail,
            rawHeaders,
        };
    }

    @Get('private2')
    @RoleProtected(ValidRoles.administrador, ValidRoles.doctor)
    @UseGuards(AuthGuard(), UserRoleGuard)
    privateRoute2(@GetUser() user: User) {
        return {
            ok: true,
            user,
        };
    }

    @Get('private3')
    @Auth(ValidRoles.administrador)
    privateRoute3(@GetUser() user: User) {
        return {
            ok: true,
            user,
        };
    }
}
