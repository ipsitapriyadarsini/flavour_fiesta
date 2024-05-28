import { Schema, model, models, Document, HydratedDocument } from "mongoose";

export type TCategory = {
  _id: string;
  name: string;
  image_url: string;
};
export type TCategoryModel = HydratedDocument<TCategory>;

const recipeCategorySchema = new Schema({
  name: { type: String, required: true },
  image_url: { type: String, required: true },
});

export default models.Recipe_Categories ||
  model<TCategory>("Recipe_Categories", recipeCategorySchema);
