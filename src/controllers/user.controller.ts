import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Post, Body, Put, BadRequestException } from '@nestjs/common';
import { AuthUser, RolesGate } from 'src/core/decorators';
import { Roles } from 'src/core/enums';
import { CreateUserDto, UpdateUserDto, UpdateUserPasswordDto } from 'src/core/dtos';
import { UserFactoryService, UserService } from '../use-cases';

@ApiTags("User Management")
@Controller('api/user')
export class UserController {
    constructor(
        private userFactoryService: UserFactoryService,
        private readonly userService: UserService,
    ) { }

    @Get()
    getAll(@AuthUser() authUser: any) {
        if (authUser.type === Roles.SUPER_ADMIN || authUser.type === Roles.ADMIN) {
            return this.userService.getAllUsers();
        } else {
            return this.userService.getUserById((authUser.id));
        }
    }

    @Get(':id')
    getById(@Param('id') id: string, @AuthUser() authUser: any) {
        if (authUser.type === Roles.SUPER_ADMIN || authUser.type === Roles.ADMIN) {
            return this.userService.getUserById(id);
        } else {
            if (authUser.id.toString() !== id) {
                throw new BadRequestException();
            }
            return this.userService.getUserById(authUser.id);
        }
    }

    @Post()
    @RolesGate(Roles.SUPER_ADMIN, Roles.ADMIN)
    createUser(@Body() userDto: CreateUserDto) {
        const user = this.userFactoryService.createUser(userDto);
        return this.userService.createUser(user);
    }

    @Put('password')
    @RolesGate(Roles.SUPER_ADMIN, Roles.ADMIN, Roles.USER)
    updatePassword(@Body() updatePasswordDto: UpdateUserPasswordDto, @AuthUser() authUser: any) {
        const user = this.userFactoryService.updateUserPassword(updatePasswordDto);
        return this.userService.updateUser(authUser.id, user);
    }

    @Put(':id')
    @RolesGate(Roles.SUPER_ADMIN, Roles.ADMIN)
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        const user = this.userFactoryService.updateUser(updateUserDto);
        return this.userService.updateUser(id, user);
    }

}