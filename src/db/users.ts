import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  salt: { type: String, required: true },
  password: { type: String, required: true },
  isDelete: { type: Boolean, default: false, required: true },
});
export const UserModel = mongoose.model('User', UserSchema);

export const createUser = (values: Record<string, any>) => new UserModel(values)
  .save().then((user) => user.toObject());

export const getUserByEmail = (email: string) => UserModel.findOne({ email }, "-__v")

export const getUserById = (id: string) => {
  const objectId = new mongoose.Types.ObjectId(id);

  return UserModel.findById(objectId, "-__v")
}

export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values, { new: true });