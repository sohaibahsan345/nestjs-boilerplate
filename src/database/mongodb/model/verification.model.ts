import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Verifications, VerificationStatus } from 'src/core/enums';
import { User } from './user.model';

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Verification {

    @Prop({ type: Types.ObjectId, ref: "User" })
    user: User;

    @Prop({ type: String, required: true })
    code: string;

    @Prop({ type: String, enum: Verifications })
    type: string;

    @Prop({ type: String, enum: VerificationStatus, default: VerificationStatus.PENDING })
    status: string;

}

export type VerificationDocument = Verification & Document;
export const VerificationSchema = SchemaFactory.createForClass(Verification);