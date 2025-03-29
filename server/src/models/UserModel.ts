import { modelOptions, prop, getModelForClass } from "@typegoose/typegoose";
import mongoose from "mongoose";

@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
  public _id?: mongoose.Types.ObjectId;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ required: true, default: false })
  public isAdmin!: boolean;
}

export const UserModel = getModelForClass(User);
