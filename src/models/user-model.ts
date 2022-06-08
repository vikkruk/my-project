import {
  Document,
  Model, model, Schema, Types,
} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export type User = {
  email: string,
  password: string,
  role: 'user' | 'admin',
  favoredActors: Types.ObjectId[],
  nickname?: string,
  avatar?: string,
};

export type UserDocument = Document<unknown, any, User> & User & {
  _id: Types.ObjectId;
};

const userSchema = new Schema<User, Model<User>>({
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
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  favoredActors: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Artist' }],
    default: [],
  },
  nickname: {
    type: String,
  },
});

userSchema.plugin(uniqueValidator);

const UserModel = model('User', userSchema);

export default UserModel;
