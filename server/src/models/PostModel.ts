import {
  modelOptions,
  prop,
  getModelForClass,
  Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { User } from "./UserModel";

class Coordinates {
  @prop({ required: true })
  latitude!: number;

  @prop({ required: true })
  longitude!: number;
}

class Comment {
  @prop({ ref: () => User, required: true })
  userId!: Ref<User>;

  @prop({ required: true })
  text!: string;

  @prop({ default: () => new Date() })
  createdAt!: Date;
}

@modelOptions({ schemaOptions: { timestamps: true } })
export class Post {
  public _id!: mongoose.Types.ObjectId;

  @prop({ required: true })
  title!: string;

  @prop({ required: true })
  description!: string;

  @prop({ type: () => [String], required: true }) // says type: () => [String] -> array of strings
  images!: string[];

  @prop({ ref: () => User, required: true })
  userId!: Ref<User>;

  @prop({ type: () => [Comment], required: true })
  comments!: Comment[];

  @prop({ ref: () => User, type: () => [String], default: [] })
  likes!: Ref<User>[];

  @prop({ type: () => Coordinates, _id: false })
  location!: Coordinates;
}

export const PostModel = getModelForClass(Post);
