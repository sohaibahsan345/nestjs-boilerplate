import { BadRequestException, Controller, Get, Param } from "@nestjs/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { Errors, Success, Verifications } from "src/core/enums";
import { VerificationService, VerificationFactoryService, UserService } from "../use-cases/";
import { AuthUser } from "src/core/decorators";
import { MailService } from "src/core/services";

@ApiTags("Verification Service")
@Controller('api/verification')
export class VerificationController {

    constructor(
        private readonly verificationService: VerificationService,
        private readonly userService: UserService,
        private readonly emailService: MailService,
        private verificationFactoryService: VerificationFactoryService
    ) { }

    @Get('create/:type')
    @ApiParam({ name: "type", required: true, description: "Verification Type", type: "string", enum: Verifications })
    async createVerification(@Param("type") type: string, @AuthUser() authUser: any) {
        if (type === Verifications.EMAIL) {
            const verification = this.verificationFactoryService.createVerification({ id: authUser.id, type });
            await this.verificationService.createEmailVerification(verification);
            await this.emailService.sendEmail({
                template: 'email-verification',
                to: authUser.email,
                subject: 'Email Verification',
                context: { name: authUser.email.split('@')[0], code: verification.code }
            });
            return { message: Success['EMAIL_VERIFICATION'] };
        } else if (type === Verifications.PHONE) {
            return { message: 'Phone verification is under process' };
        } else {
            throw new BadRequestException(Errors['INVALID_VERIFICATION_TYPE']);
        }
    }

    @Get('verify/:type/:code')
    @ApiParam({ name: "type", required: true, description: "Verification Type", type: "string", enum: Verifications })
    @ApiParam({ name: "code", required: true, description: "Verification Code", type: "string" })
    async verifyVerification(@Param("type") type: string, @Param("code") code: string, @AuthUser() authUser: any) {
        try {
            if (type === Verifications.EMAIL) {
                const verification = this.verificationFactoryService.verifyVerification({ id: authUser.id, code, type });
                await this.verificationService.verifyEmailVerification(verification);
                await this.userService.updateUser(verification.user, { is_verified_email: true });
                this.emailService.sendEmail({
                    template: 'email-verification-success',
                    to: authUser.email,
                    subject: 'Email Verified!',
                    context: { name: authUser.email.split('@')[0] }
                });
                return { message: Success['VERIFY_EMAIL_VERIFICATION'] };
            } else if (type === Verifications.PHONE) {
                return { message: 'Phone verification is under process' };
            } else {
                throw new BadRequestException(Errors['INVALID_VERIFICATION_TYPE']);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

}