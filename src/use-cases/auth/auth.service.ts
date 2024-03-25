import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

interface tokenPayLoad {
    id: string,
    email: string,
    type: string;
    status: string;
}

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async generateTokens(payLoad: tokenPayLoad) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                payLoad,
                {
                    secret: this.configService.get<string>('atSecret'),
                    expiresIn: this.configService.get<string>('atTTL')
                }
            ),
            this.jwtService.signAsync(
                payLoad,
                {
                    secret: this.configService.get<string>('rtSecret'),
                    expiresIn: this.configService.get<string>('rtTTL')
                }
            )
        ]);
        return { accessToken, refreshToken };
    }
}