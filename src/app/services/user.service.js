import { hashPassword } from "../providers/auth/password.auth-provider.js";
import { User } from "../schema/user.schema.js";

export const createUser = async (user) => {
  const newUser = new User({
    ...user,
    password: await hashPassword(user.password),
  });
  await newUser.save();

  return {
    id: user._id,
    name: user.name,
    email: user.email,
  }
};

export const getUser = async (id) => {
  const user = await User.findById(id);

   return {
     id,
     name: user.name,
     email: user.email,
   };
};

export const findUserByEmail = async (email) => {
    return await User.findOne({ email });
}
