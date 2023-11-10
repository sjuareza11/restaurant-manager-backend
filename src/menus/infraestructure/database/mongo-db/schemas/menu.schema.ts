import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MenuEntity } from '@src/menus/domain/entities/menu.entity';
import { generateUUID } from '@src/shared/domain/utils/uuid';
import { Document } from 'mongoose';

@Schema()
export class Menu extends Document implements MenuEntity {
  @Prop({ type: String, default: () => generateUUID() })
  _id: string;
  @Prop({ required: true })
  name: string;
  description: string;
  @Prop({ required: true, unique: true, index: true })
  code: string;
  @Prop({ default: true })
  available: boolean;
  @Prop({
    type: String,
    ref: 'Store',
  })
  storeId: string;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
