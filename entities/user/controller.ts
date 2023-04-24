import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./model.js";
import config from "../../conf.js";

export const login = async (req) => {
  const { email, password } = req.body;
  if (!email || !password) throw new Error ("MISSING_DATA");
  const user = await User.findOne({email: email});
  if (!user) throw new Error ("LOGIN_ERROR")
  if (!(await bcrypt.compare(password, user.password))) throw new Error ("WRONG_PASSWORD")
  const payload = {"id": user._id, "email": user.email, "role": user.role};
  const token = jwt.sign(payload, config.SECRET)
  return token;
};

export const listUser = async (data) => {
  const nameUserRegex = new RegExp(data.name, 'i');
  if (data.name) {
    return await User.find({ name: nameUserRegex });
  } else {
    return await User.find({}, { name: 1, email: 1, role: 1 });
  }
};

export const detailedUser = async (id) => {
  return await User.findOne({ _id: id });
};

export const addUser = async (data) => {
  console.log('1')
  data.password = await bcrypt.hash(data.password, 8) 
  const user = new User(data);
  return await user.save();
};

export const editUser = async (req) => {
  const user = await User.findOne({ _id: req.params.id });
  if (user) {
    await User.replaceOne({ _id: req.params.id }, req.body);
    return await user.save();
  }
};

export const patchUser = async (req) => {
  const user = await User.findOne({ _id: req.params.id });
  if (user) {
    await User.updateOne({ _id: req.params.id }, req.body);
    return await user.save();
  }
};

export const deleteUser = async (id) => {
  const user = await User.findOne({ _id: id });
  if (user) {
    return await User.deleteOne({ _id: id });
  }
};