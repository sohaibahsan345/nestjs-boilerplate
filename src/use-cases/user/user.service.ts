import { HttpException, Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { UpdateQuery } from 'mongoose';
import { IDataServices } from 'src/core/abstracts';
import { User } from 'src/core/entities';
import { Errors } from 'src/core/enums';

@Injectable()
export class UserService {
    constructor(private dataServices: IDataServices) { }

    getAllUsers(): Promise<User[]> {
        return this.dataServices.users.getAll();
    }

    getUserById(id: string): Promise<User> {
        return this.dataServices.users.get(id);
    }

    async createUser(userPayLoad: User): Promise<User | HttpException> {
        try {
            return await this.dataServices.users.create(userPayLoad);
        } catch (error) {
            if (error.code === 11000) {
                if (error.message.includes("email_1")) {
                    return Promise.reject(new ConflictException(Errors["EMAIL_EXIST"]));
                }
            }
            return Promise.reject(error);
        }
    }

    updateUser(id: string, updateUserPayLoad: UpdateQuery<User>): Promise<User> {
        try {
            return this.dataServices.users.update(id, updateUserPayLoad);
        } catch (error) {
            if (error.code === 11000) {
                if (error.message.includes("email_1")) {
                    return Promise.reject(new Error(Errors["EMAIL_EXIST"]));
                }
            }
            return Promise.reject(error);
        }
    }

    async validateUserLoginDetails({ email, password }): Promise<User | HttpException> {
        try {
            const user = await this.dataServices.users.getByQuery(
                { email },
                { _id: 1, email: 1, type: 1, is_verified_email: 1, is_verified_phone: 1, status: 1, password: 1 }
            );
            // @ts-ignore
            if (user && await user.matchPassword(password)) {
                let userWithoutPass = JSON.parse(JSON.stringify(user));
                delete userWithoutPass.password;
                return userWithoutPass;
            } else {
                throw new NotFoundException(Errors['INVALID_LOGIN_DETAILS']);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    userAggregate(aggregatePipeLine) {
        return this.dataServices.users.aggregate(aggregatePipeLine);
    }
}