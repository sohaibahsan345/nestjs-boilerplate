import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { DataServicesModule } from 'src/core/services';
import { UserSeeder } from './user.seeder';

@Module({
    imports: [CommandModule, DataServicesModule],
    providers: [UserSeeder],
    exports: [UserSeeder]
})

export class SeederModule { }