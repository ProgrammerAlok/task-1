import { model, Schema } from "mongoose";
import jwt from "jsonwebtoken";

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

UserSchema.methods.generateToken = function () {
  const payload = {
    _id: this._id,
    email: this.email,
  };

  const jwtToken = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "24h",
  });

  return jwtToken;
};

export default model("User", UserSchema);
