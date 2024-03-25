import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDataServices } from 'src/core/abstracts';
import { MongoGenericRepository } from './mongo-generic-repository';
import {
    User, UserDocument,
    Verification, VerificationDocument,
    Profile, ProfileDocument
} from './model';

@Injectable()
export class MongoDataServices
    implements IDataServices, OnApplicationBootstrap {
    users: MongoGenericRepository<User>;
    verifications: MongoGenericRepository<Verification>;
    profiles: MongoGenericRepository<Profile>;

    constructor(
        @InjectModel(User.name)
        private UserRepository: Model<UserDocument>,
        @InjectModel(Verification.name)
        private VerificationRepository: Model<VerificationDocument>,
        @InjectModel(Profile.name)
        private ProfileRepository: Model<ProfileDocument>
    ) { }

    onApplicationBootstrap() {
        this.users = new MongoGenericRepository<User>(this.UserRepository);
        this.verifications = new MongoGenericRepository<Verification>(this.VerificationRepository);
        this.profiles = new MongoGenericRepository<Profile>(this.ProfileRepository);
    }
}