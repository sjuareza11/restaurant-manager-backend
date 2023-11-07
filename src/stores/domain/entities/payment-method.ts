import { PaymentMethodsConfig } from '../enums/payment-methods-config.enum';

export interface PaymentMethodEntity {
  _id?: string;
  name: PaymentMethodsConfig;
  privateKey: string;
  publicKey: string;
  available: boolean;
  storeId: string | any;
}
