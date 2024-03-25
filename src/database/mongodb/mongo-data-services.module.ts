import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { IDataServices } from 'src/core/abstracts';
import { MongoDataServices } from './mongo-data-services.service';
import {
    User, UserSchema,
    Verification, VerificationSchema,
    Profile, ProfileSchema
} from './model';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Verification.name, schema: VerificationSchema },
            { name: Profile.name, schema: ProfileSchema }
        ]),
        MongooseModule.forRootAsync({
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('mongoConnectionString')
            }),
            inject: [ConfigService]
        })
    ],
    providers: [
        {
            provide: IDataServices,
            useClass: MongoDataServices
        }
    ],
    exports: [IDataServices]
})
export class MongoDataServicesModule { }