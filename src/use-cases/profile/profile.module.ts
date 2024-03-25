import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/core/services';
import { ProfileFactoryService } from './profile-factory.service';
import { ProfileService } from './profile.service';

@Module({
    imports: [DataServicesModule],
    providers: [ProfileFactoryService, ProfileService],
    exports: [ProfileFactoryService, ProfileService]
})

export class ProfileModule { }