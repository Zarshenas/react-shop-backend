import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
  id: { type: Schema.Types.Number , unique:true},
  name: { type: Schema.Types.String },
  image: { type: Schema.Types.String },
});

export const Categories = mongoose.model("Categories", categorySchema);
