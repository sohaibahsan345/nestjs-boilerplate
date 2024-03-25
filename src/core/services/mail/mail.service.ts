import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

interface EmailObj {
    template: string;
    to: string;
    subject: string;
    context?: object;
}

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) { }

    async sendEmail({ template, to, subject, context }: EmailObj): Promise<void> {
        try {
            await this.mailerService.sendMail({ to, subject, template, context });
        } catch (error) {
            console.log('\t\t===== Error While Sending Email =====\n', error.message);
            // return Promise.reject(new Error(error.message));
        }
    }
}