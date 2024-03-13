import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MSchema } from "mongoose";
import { User } from "./user.model";

export type PostDocument = Document<Post>;

@Schema()
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  text: string;

  @Prop({ type: MSchema.Types.ObjectId, ref: User.name })
  author: User;
}

export const PostSchema = SchemaFactory.createForClass(User);
