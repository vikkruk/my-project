import { model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new Schema({
  nickname: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  roles: {
    type: String,
    enum: ['user', 'admin'],
    default: ['user'],
  },
  favoredActors: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Artist' }],
    default: [],
  },
});

userSchema.plugin(uniqueValidator);

const UserModel = model('User', userSchema);

export default UserModel;
