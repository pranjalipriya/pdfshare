import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true, unique: true })
  userId: string;

  @Prop({ type: String })
  name: string;

  @Prop({ required: true, type: String, unique: true })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({  type: Array })
  links: [];

}

export type UsersDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
