import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/core/services';
import { VerificationFactoryService } from './verification-factory.service';
import { VerificationService } from './verification.service';

@Module({
    imports: [DataServicesModule],
    providers: [VerificationFactoryService, VerificationService],
    exports: [VerificationFactoryService, VerificationService]
})

export class VerificationModule { }