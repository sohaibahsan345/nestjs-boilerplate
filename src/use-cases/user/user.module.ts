import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/core/services';
import { UserFactoryService } from './user-factory.service';
import { UserService } from './user.service';

@Module({
    imports: [DataServicesModule],
    providers: [UserFactoryService, UserService],
    exports: [UserFactoryService, UserService]
})

export class UserModule { }