import { BadRequestException, Injectable } from "@nestjs/common";
import { IDataServices } from "src/core/abstracts";
import { Verification } from "src/core/entities";
import { Errors, VerificationStatus } from "src/core/enums";

@Injectable()
export class VerificationService {
    constructor(
        private dataServices: IDataServices
    ) { }

    async createEmailVerification(verificationPayLoad: Verification): Promise<any> {
        try {
            return await this.dataServices.verifications.updateByQuery(
                { user: verificationPayLoad.user, type: verificationPayLoad.type },
                verificationPayLoad,
                {
                    upsert: true, // It will create document if not exist else update
                    new: true // Return updated document
                }
            );
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async verifyEmailVerification(verificationPayLoad: Verification): Promise<any> {
        try {
            const updatedVerification = await this.dataServices.verifications.updateByQuery(
                verificationPayLoad,
                { status: VerificationStatus.APPROVED }
            );
            if (!updatedVerification) {
                throw new BadRequestException(Errors['INVALID_VERIFICATION']);
            }
            return updatedVerification;
        } catch (error) {
            return Promise.reject(error);
        }
    }

}