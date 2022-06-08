import { model, Schema } from 'mongoose';

const artistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  roles: {

    type: [{ type: Schema.Types.ObjectId, ref: 'ArtistRole' }],
    default: [],
    required: true,

  },
}, {
  timestamps: true,
});

const ArtistModel = model('Artist', artistSchema);

export default ArtistModel;
