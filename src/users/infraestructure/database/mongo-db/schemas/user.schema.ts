import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { generateUUID } from '@shared/domain/utils/uuid';
import { UserEntity } from '@users/domain/entities/user.entity';
import { Document } from 'mongoose';

@Schema()
export class User extends Document implements UserEntity {
  @Prop({ type: String, default: generateUUID() })
  _id: string;
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
  @Prop({ type: String, ref: 'Organization' })
  organizationId: string;
  @Prop({ type: String, ref: 'Stores' })
  storeId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.set('timestamps', true);
