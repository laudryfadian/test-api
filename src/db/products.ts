import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  isDelete: { type: Boolean, default: false, required: true },
});
export const ProductModel = mongoose.model('Product', ProductSchema);

export const getProducts = () => ProductModel.find({isDelete: false}, "-isDelete -__v");

export const getProductById = (id: string) => {
  const objectId = new mongoose.Types.ObjectId(id);

  return ProductModel.findById(objectId, "-__v")
}

export const createProduct = (values: Record<string, any>) => new ProductModel(values)
  .save().then((product) => product.toObject());

export const updateProductById = (id: string, values: Record<string, any>) => ProductModel.findByIdAndUpdate(id, values, { new: true });