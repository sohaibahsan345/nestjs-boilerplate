import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AuthUser, RolesGate } from 'src/core/decorators';
import { CreateProfileDto, UpdateProfileDto } from 'src/core/dtos';
import { ProfileFactoryService, ProfileService } from 'src/use-cases';
import { Roles } from 'src/core/enums';

@ApiTags('Profile Management')
@Controller('api/profile')
export class ProfileController {

    constructor(
        private profileFactoryService: ProfileFactoryService,
        private readonly profileService: ProfileService,
    ) { }

    @Get()
    get(@AuthUser() authUser: any) {
        return this.profileService.getProfileByUserId(authUser.id);
    }

    // @Get(':id')
    // @ApiParam({ name: 'id', required: true, description: 'Profile ID', type: 'string' })
    // getById(@Param('id') id: string, @AuthUser() authUser: any) {
    //     if (authUser.type === Roles.SUPER_ADMIN || authUser.type === Roles.ADMIN) {
    //         return this.profileService.getProfileById(id);
    //     } else {
    //         return this.profileService.getProfileByUserId(authUser.id);
    //     }
    // }

    @Post()
    createProfile(@Body() profileDto: CreateProfileDto, @AuthUser() authUser: any) {
        // setting user reference in profile dto
        profileDto['user'] = authUser.id;
        const profilePayLoad = this.profileFactoryService.createProfile(profileDto);
        return this.profileService.createProfile(profilePayLoad);
    }

    @Put()
    updateProfile(@Body() updateProfileDto: UpdateProfileDto, @AuthUser() authUser: any) {
        const updateProfilePayLoad = this.profileFactoryService.updateProfile(updateProfileDto);
        return this.profileService.updateProfile(authUser.id, updateProfilePayLoad);
    }

    @Put(':id')
    @RolesGate(Roles.SUPER_ADMIN, Roles.ADMIN)
    @ApiParam({ name: 'id', required: true, description: 'Profile ID', type: 'string' })
    updateProfileById(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
        const updateProfilePayLoad = this.profileFactoryService.updateProfile(updateProfileDto);
        return this.profileService.updateProfileById(id, updateProfilePayLoad);
    }

}