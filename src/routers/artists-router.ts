import { Router } from 'express';
import {
  createArtist, getArtist, getArtists, updateArtist,
} from '../controllers/artists-controller';

const artistsRouter = Router();

artistsRouter.get('/', getArtists);
artistsRouter.get('/:id', getArtist);
artistsRouter.post('/', createArtist);
artistsRouter.patch('/:id', updateArtist);

export default artistsRouter;
