import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateProfileDto, UpdateProfileDto } from 'src/core/dtos';
import { Profile } from 'src/core/entities';

@Injectable()
export class ProfileFactoryService {

    createProfile(createProfileDto: CreateProfileDto) {
        const profile = new Profile();
        profile.first_name = createProfileDto.first_name;
        profile.last_name = createProfileDto.last_name;
        profile.phone = createProfileDto.phone;
        profile.user = new Types.ObjectId(createProfileDto['user']);
        return profile;
    }

    updateProfile(updateProfileDto: UpdateProfileDto) {
        const profile = new Profile();
        profile.first_name = updateProfileDto.first_name;
        profile.last_name = updateProfileDto.last_name;
        profile.phone = updateProfileDto.phone;
        profile.status = updateProfileDto.status;
        return profile;
    }

}