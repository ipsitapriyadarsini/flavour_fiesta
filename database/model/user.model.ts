import { Schema, model, models } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: false },
  roles: [{ type: Schema.Types.ObjectId, ref: 'Roles' }],
});

userSchema.pre('save', async function (next) {
  // Hash password before saving user
  if (this.isModified('password') && this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.matchPassword = async function (password: string) {
  // Compare provided password with hashed password
  return await bcrypt.compare(password, this.password);
};

const modelName = models?.Users || model('Users', userSchema);

export default modelName;
