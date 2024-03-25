import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { Types, UpdateQuery } from 'mongoose';
import { IDataServices } from 'src/core/abstracts';
import { Profile } from 'src/core/entities';
import { Errors } from 'src/core/enums';

@Injectable()
export class ProfileService {
    constructor(private dataServices: IDataServices) { }

    getAllProfiles(): Promise<Profile[]> {
        return this.dataServices.profiles.getAll();
    }

    getProfileById(id: string): Promise<Profile> {
        return this.dataServices.profiles.get(id);
    }

    getProfileByUserId(userId: string): Promise<Profile> {
        return this.dataServices.profiles.getByQuery({ user: new Types.ObjectId(userId) });
    }

    async createProfile(profilePayLoad: Profile): Promise<Profile | HttpException> {
        try {
            return await this.dataServices.profiles.create(profilePayLoad);
        } catch (error) {
            if (error.code === 11000) {
                if (error.message.includes('phone_1')) {
                    return Promise.reject(new ConflictException(Errors['PHONE_EXIST']));
                }
            }
            return Promise.reject(error);
        }
    }

    updateProfile(userId: string, updateProfilePayLoad: UpdateQuery<Profile>): Promise<Profile> {
        try {
            return this.dataServices.profiles.updateByQuery({ user: new Types.ObjectId(userId) }, updateProfilePayLoad);
        } catch (error) {
            if (error.code === 11000) {
                if (error.message.includes('phone_1')) {
                    return Promise.reject(new ConflictException(Errors['PHONE_EXIST']));
                }
            }
            return Promise.reject(error);
        }
    }

    updateProfileById(profileId: string, updateProfilePayLoad: UpdateQuery<Profile>): Promise<Profile> {
        try {
            return this.dataServices.profiles.update(profileId, updateProfilePayLoad);
        } catch (error) {
            if (error.code === 11000) {
                if (error.message.includes('phone_1')) {
                    return Promise.reject(new ConflictException(Errors['PHONE_EXIST']));
                }
            }
            return Promise.reject(error);
        }
    }

    checkPhoneExist(phone: string) {
        return this.dataServices.profiles.isExist({ phone });
    }
}