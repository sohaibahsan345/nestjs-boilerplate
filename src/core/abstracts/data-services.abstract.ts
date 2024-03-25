import { IGenericRepository } from './generic-repository.abstract';
import { Profile, User, Verification } from '../entities';

export abstract class IDataServices {
    abstract users: IGenericRepository<User>;
    abstract verifications: IGenericRepository<Verification>;
    abstract profiles: IGenericRepository<Profile>;
}