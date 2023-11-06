import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserEntity } from '@users/domain/entities/user.entity';
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document implements UserEntity {
  @Prop()
  name: string;
  @Prop()
  surname: string;
  @Prop()
  phone: string;
  @Prop()
  password: string;
  @Prop({
    unique: true,
    index: true,
  })
  email: string;
  @Prop()
  refreshToken: string;
  @Prop({ type: Types.ObjectId, ref: 'Organization' })
  organizationId: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.set('timestamps', true);
