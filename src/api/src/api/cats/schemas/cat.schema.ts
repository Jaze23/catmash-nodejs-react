import mongoose, { Schema, Document } from "mongoose";
import { Cat } from "./cat.interface";
import { timedSchemaPre } from "../../../common/config";

const catSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  votes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

catSchema.pre<Cat & Document>("save", timedSchemaPre);

export default mongoose.model<Cat & Document>("Cat", catSchema);
