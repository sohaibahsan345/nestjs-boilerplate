import { Injectable } from '@nestjs/common';
import { User } from 'src/core/entities';
import { Roles } from 'src/core/enums';
import { CreateUserDto, UpdateUserDto, UpdateUserPasswordDto } from 'src/core/dtos';

@Injectable()
export class UserFactoryService {
    createUser(createUserDto: CreateUserDto) {
        const user = new User();
        user.email = createUserDto.email.toLowerCase().trim();
        user.password = createUserDto.password;
        user.type = Roles.USER;
        return user;
    }

    updateUser(updateUserDto: UpdateUserDto) {
        const user = new User();
        if (updateUserDto.email) {
            user.email = updateUserDto.email.toLowerCase().trim();
        }
        user.password = updateUserDto.password;
        user.is_verified_email = updateUserDto.is_verified_email;
        user.is_verified_phone = updateUserDto.is_verified_phone;
        user.status = updateUserDto.status;
        return user;
    }

    updateUserPassword(updateUserPasswordDto: UpdateUserPasswordDto) {
        const user = new User();
        user.password = updateUserPasswordDto.password;
        return user;
    }
}