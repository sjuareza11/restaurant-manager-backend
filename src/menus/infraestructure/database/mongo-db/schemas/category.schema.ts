import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CategoryEntity } from '@src/menus/domain/entities/category.entity';
import { generateUUID } from '@src/shared/domain/utils/uuid';
import { Document } from 'mongoose';

@Schema()
export class Category extends Document implements CategoryEntity {
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
    ref: 'Menus',
  })
  menuId: string;
  @Prop()
  imageUrl?: string;
  @Prop()
  order: number;
  @Prop({
    type: String,
    ref: 'Stores',
  })
  storeId: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
