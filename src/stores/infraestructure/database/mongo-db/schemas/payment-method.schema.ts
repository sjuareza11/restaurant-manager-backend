import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { generateUUID } from '@shared/domain/utils/uuid';
import { PaymentMethodEntity } from '@src/stores/domain/entities/payment-method';
import { Document } from 'mongoose';
import { PaymentMethodsConfig } from './../../../../domain/enums/payment-methods-config.enum';
import { Store } from './store.schema';
@Schema()
export class PaymentMethod extends Document implements PaymentMethodEntity {
  @Prop({ type: String, default: () => generateUUID() })
  _id: string;
  @Prop({
    type: String,
    enum: PaymentMethodsConfig,
    required: true,
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
    ref: Store.name,
  })
  storeId: string;
}

export const PaymentMethodSchema = SchemaFactory.createForClass(PaymentMethod);
PaymentMethodSchema.set('timestamps', true);
PaymentMethodSchema.index({ code: 1, organizationId: 1 }, { unique: true, sparse: true });
