import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentMethodsService } from './application/payment-methods.service';
import { StoresService } from './application/stores.service';
import { PaymentMethodsController } from './controllers/payment-methods.controller';
import { StoresController } from './controllers/stores.controller';
import { DataService } from './domain/abstract/data-service';
import { MongoDataService } from './infraestructure/database/mongo-db/mongo-data.service';
import {
  PaymentMethod,
  PaymentMethodSchema,
} from './infraestructure/database/mongo-db/schemas/payment-method.schema';
import {
  Store,
  StoreSchema,
} from './infraestructure/database/mongo-db/schemas/store.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Store.name, schema: StoreSchema },
      { name: PaymentMethod.name, schema: PaymentMethodSchema },
    ]),
  ],
  controllers: [StoresController, PaymentMethodsController],
  providers: [
    StoresService,
    PaymentMethodsService,
    {
      provide: DataService,
      useClass: MongoDataService,
    },
  ],
})
export class StoresModule {}
