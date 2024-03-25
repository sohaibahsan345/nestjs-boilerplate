import { Command } from 'nestjs-command';
import { Injectable, Logger } from '@nestjs/common';
import { IDataServices } from 'src/core/abstracts';
import { Roles, UserStatus } from 'src/core/enums';

@Injectable()
export class UserSeeder {
    constructor(private dataServices: IDataServices) { }
    private readonly logger: Logger = new Logger(UserSeeder.name);
    // run seeders
    // npx nestjs-command create:user
    @Command({ command: 'create:user', describe: 'Creating Super Admin & Admin' })
    async createUsers() {
        try {
            this.logger.log('\t===== Running User Seeder =====\n');
            this.logger.log('\t===== Checking if users already created =====\n');
            if (await this.dataServices.users.isExist({ type: { $in: ['super_admin', 'admin'] } })) {
                return this.logger.error('Users already created');
            }
            this.logger.log('\t===== Creating Users =====\n');
            await this.dataServices.users.create({
                email: 'superadmin@xyz.com',
                password: 'SuperAdmin@123',
                type: Roles.SUPER_ADMIN,
                status: UserStatus.ACTIVE
            });
            this.logger.log('\t===== Super Admin Created =====\n');
            await this.dataServices.users.create({
                email: 'admin@xyz.com',
                password: 'Admin@123',
                type: Roles.ADMIN,
                status: UserStatus.ACTIVE
            });
            this.logger.log('\t===== Admin Created =====\n');
        } catch (error) {
            this.logger.log('Error while creating Super Admin & Admin\n', error);
        }
    }
}