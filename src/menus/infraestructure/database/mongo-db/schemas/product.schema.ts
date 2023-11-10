import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProductEntity } from '@src/menus/domain/entities/product.ts';
import { generateUUID } from '@src/shared/domain/utils/uuid';
import { Store } from '@src/stores/infraestructure/database/mongo-db/schemas/store.schema';
import { Document } from 'mongoose';
import { Category } from './category.schema';
import { Menu } from './menu.schema';

@Schema()
export class Product extends Document implements ProductEntity {
  @Prop({ type: String, default: () => generateUUID() })
  _id: string;
  @Prop({ required: true })
  name: string;
  @Prop()
  description: string;
  @Prop({ required: true, unique: true, index: true })
  code: string;
  @Prop({ default: true })
  available: boolean;
  @Prop({
    type: String,
    ref: Menu.name,
  })
  menuId: string;
  @Prop()
  imageUrl?: string;
  @Prop()
  order: number;
  @Prop({
    type: String,
    ref: Store.name,
  })
  storeId: string;
  @Prop()
  price: number;
  @Prop({ type: [String], ref: Category.name, default: [] })
  categories?: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.pre('save', function (next) {
  if (this.isNew && !this.order) {
    this.model(Product.name)
      .find()
      .sort('-order')
      .limit(1)
      .then(([maxOrderProduct]) => {
        if (maxOrderProduct) {
          this.order = (maxOrderProduct as any).order + 1;
        } else {
          this.order = 1;
        }
        next();
      })
      .catch(next);
  } else {
    next();
  }
});
