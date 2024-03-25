import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';

@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: async (configService: ConfigService) => ({
                // transport: 'smtps://user@domain.com:pass@smtp.domain.com',
                transport: {
                    host: configService.get<string>('mailHost'),  // Outgoing Server
                    port: configService.get<number>('mailPort'),  // Outgoing Port
                    secure: true,
                    auth: {
                        user: configService.get<string>('mailUser'),
                        pass: configService.get<string>('mailPassword')
                    }
                },
                defaults: {
                    from: `'XYZ' <${configService.get<string>('mailFrom')}>`
                },
                template: {
                    // dir: __dirname + '/templates',
                    dir: `${process.cwd()}/src/core/services/mail/templates`,
                    adapter: new HandlebarsAdapter(),
                    options: { strict: true }
                }
            }),
            inject: [ConfigService]
        })
    ],
    providers: [MailService],
    exports: [MailService]
})

export class MailModule { }