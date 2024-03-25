import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { compare, hash } from 'bcrypt';
import { Roles, UserStatus } from 'src/core/enums';

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class User {

    @Prop({ type: String, unique: true, lowercase: true, required: true })
    email: string;

    @Prop({ type: String, required: true, select: false })
    password: string;

    @Prop({ type: String, enum: Roles, default: Roles.USER })
    type: string;

    @Prop({ type: Boolean, default: false })
    is_verified_email: boolean;

    @Prop({ type: Boolean, default: false })
    is_verified_phone: boolean;

    @Prop({ type: String, enum: UserStatus })
    status: string;

    @Prop({ type: Types.ObjectId, ref: 'User', default: undefined })
    created_by: User;

}

const uSchema = SchemaFactory.createForClass(User);
// Saving password as hash if new user created or if password got modify
uSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this['password'] = await hash(this['password'], 10);
});
// Saving password as hash if new user created or if password got modify
uSchema.pre('findOneAndUpdate', async function (next) {
    if (this['_update']['password']) {
        this['_update']['password'] = await hash(this['_update']['password'], 10);
        this.set({ password: this['_update']['password'] });
    }
});
// Method on user schema to compare hashed password in db with user provided password
uSchema.methods.matchPassword = async function (enteredPassword) {
    return await compare(enteredPassword, this['password']);
};

export type UserDocument = User & Document;
export const UserSchema = uSchema;