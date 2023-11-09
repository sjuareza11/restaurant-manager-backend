import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { generateUUID } from '@shared/domain/utils/uuid';
import { PaymentMethodEntity } from '@src/stores/domain/entities/payment-method';
import { Document } from 'mongoose';
import { PaymentMethodsConfig } from './../../../../domain/enums/payment-methods-config.enum';
@Schema()
export class PaymentMethod extends Document implements PaymentMethodEntity {
  @Prop({ type: String, default: () => generateUUID() })
  _id: string;
  @Prop({
    type: String,
    enum: PaymentMethodsConfig,
    required: true,
    unique: true,
  })
  name: PaymentMethodsConfig;
  @Prop()
  privateKey: string;
  @Prop()
  publicKey: string;
  @Prop({ default: true })
  available: boolean;
  @Prop({
    type: String,
    ref: 'Stores',
  })
  storeId: string;
}

export const PaymentMethodSchema = SchemaFactory.createForClass(PaymentMethod);
