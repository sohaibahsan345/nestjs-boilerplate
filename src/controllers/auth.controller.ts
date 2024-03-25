import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthUser, Public } from 'src/core/decorators';
import { CreateUserDto, SignInDto } from 'src/core/dtos';
import { User } from 'src/core/entities';
import { Verifications } from 'src/core/enums';
import { RefreshTokenGuard } from 'src/core/guards';
import { MailService } from 'src/core/services';
import { UserFactoryService, UserService, VerificationFactoryService, VerificationService } from 'src/use-cases';
import { AuthService } from 'src/use-cases/auth';

@ApiTags('Authentication')
@Controller('api/auth')
export class AuthController {
    constructor(
        private userFactoryService: UserFactoryService,
        private userService: UserService,
        private verificationFactoryService: VerificationFactoryService,
        private verificationService: VerificationService,
        private authService: AuthService,
        private mailService: MailService
    ) { }

    @Public()
    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    refreshTokens(@AuthUser() authUser: any) {
        return this.authService.generateTokens({
            id: authUser.id,
            email: authUser.email,
            type: authUser.type,
            status: authUser.status
        });
    }

    @Public()
    @Post('signup')
    async signUp(@Body() userDto: CreateUserDto) {
        const userPayLoad = this.userFactoryService.createUser(userDto);
        const user = await this.userService.createUser(userPayLoad) as User;
        const emailVerificationPayLoad = this.verificationFactoryService.createVerification({ id: user['_id'], type: Verifications.EMAIL });
        await this.verificationService.createEmailVerification(emailVerificationPayLoad);
        await this.mailService.sendEmail({
            template: 'email-verification',
            to: user.email,
            subject: 'Email Verification',
            context: { name: user.email, code: emailVerificationPayLoad.code }
        });
        const tokens = await this.authService.generateTokens({
            id: user['_id'],
            email: user.email,
            type: user.type,
            status: user.status
        });
        return { user, tokens };
    }

    @Public()
    @Post('signin')
    async signIn(@Body() payLoad: SignInDto) {
        const user = await this.userService.validateUserLoginDetails(payLoad) as User;
        const tokens = await this.authService.generateTokens({
            id: user['_id'],
            email: user.email,
            type: user.type,
            status: user.status
        });
        return { user, tokens };
    }
}