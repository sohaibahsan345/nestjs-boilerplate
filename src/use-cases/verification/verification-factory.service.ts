import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { Verification } from 'src/core/entities';
import { VerificationStatus } from 'src/core/enums';

@Injectable()
export class VerificationFactoryService {

    createVerification({ id, type }) {
        const verification = new Verification();
        verification.user = new Types.ObjectId(id);
        verification.code = Math.random().toString(36).slice(2, 8); // Random string of 6 characters
        verification.type = type;
        return verification;
    }

    verifyVerification({ id, type, code }) {
        const verification = new Verification();
        verification.user = new Types.ObjectId(id);
        verification.code = code;
        verification.type = type;
        verification.status = VerificationStatus.PENDING;
        return verification;
    }

}