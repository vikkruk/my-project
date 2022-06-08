import { model, Schema } from 'mongoose';

const artistRoleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const ArtistRoleModel = model('ArtistRole', artistRoleSchema);

export default ArtistRoleModel;
