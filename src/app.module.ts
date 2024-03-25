import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommandModule } from 'nestjs-command';
import { APP_GUARD } from '@nestjs/core';
import configuration from './config/configuration';
import { AccessTokenGuard, RolesGuard } from './core/guards';
import { DataServicesModule, MailModule } from './core/services';
import { SeederModule } from './database/mongodb/seeders';
import { AuthModule, ProfileModule, UserModule, VerificationModule } from './use-cases';
import { AppController, AuthController, ProfileController, UserController, VerificationController } from './controllers';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    DataServicesModule,
    CommandModule,
    SeederModule,
    AuthModule,
    MailModule,
    UserModule,
    VerificationModule,
    ProfileModule
  ],
  controllers: [
    AppController,
    AuthController,
    UserController,
    VerificationController,
    ProfileController,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})

export class AppModule { }