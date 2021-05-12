import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Product {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  image: string;
}

export type ProductDocument = Product & Document
export const ProductSchema = SchemaFactory.createForClass(Product);