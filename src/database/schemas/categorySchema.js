const mongoose = require('mongoose');
const {Schema} = mongoose;

const categorySchema = new Schema({
  id: { type: Schema.Types.Number , unique:true},
  name: { type: Schema.Types.String },
  image: { type: Schema.Types.String },
});

const Categories = mongoose.model("Categories", categorySchema);
module.exports= Categories;
