import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CategoryEntity } from '@src/menus/domain/entities/category.entity';
import { generateUUID } from '@src/shared/domain/utils/uuid';
import { Store } from '@src/stores/infraestructure/database/mongo-db/schemas/store.schema';
import { Document } from 'mongoose';
import { Menu } from './menu.schema';

@Schema()
export class Category extends Document implements CategoryEntity {
  @Prop({ type: String, default: () => generateUUID() })
  _id: string;
  @Prop({ required: true })
  name: string;
  @Prop()
  description: string;
  @Prop({ required: true })
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
}

export const CategorySchema = SchemaFactory.createForClass(Category);
CategorySchema.set('timestamps', true);
CategorySchema.index({ code: 1, storeId: 1 }, { unique: true, sparse: true });
CategorySchema.pre('save', function (next) {
  if (this.isNew && !this.order) {
    this.model(Category.name)
      .find()
      .sort('-order')
      .limit(1)
      .then(([maxOrderCategory]) => {
        if (maxOrderCategory) {
          this.order = (maxOrderCategory as any).order + 1;
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
