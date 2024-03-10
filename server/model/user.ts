import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  roles: [{ type: Schema.Types.ObjectId, ref: "Role" }],
});
export default model("User", userSchema);
