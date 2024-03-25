import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserProfileStatus } from 'src/core/enums';
import { User } from './user.model';

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Profile {

    @Prop({ type: String, required: true })
    first_name: string;

    @Prop({ type: String, required: true })
    last_name: string;

    @Prop({ type: String, unique: true, sparse: true })
    phone: string;

    @Prop({ type: String, enum: UserProfileStatus, default: UserProfileStatus.ACTIVE })
    status: string;

    @Prop({ type: Types.ObjectId, ref: 'User', unique: true, required: true })
    user: User;

}

export type ProfileDocument = Profile & Document;
export const ProfileSchema = SchemaFactory.createForClass(Profile);