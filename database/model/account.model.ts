// Account model used by Google auth
import { Schema, model, models } from 'mongoose';

const accountSchema = new Schema({
  access_token: { type: String, required: true },
  id_token: { type: String, required: true },
  expires_at: { type: Number, required: true },
  scope: { type: String, required: true },
  token_type: { type: String, required: true },
  providerAccountId: { type: String, required: true },
  provider: { type: String, required: true },
  type: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, required: true },
});
export default models.Accounts || model('Accounts', accountSchema);
