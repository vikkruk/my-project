import { Router } from 'express';
import {
  createArtist, deleteArtist, getArtist, getArtists, updateArtist,
} from '../controllers/artists-controller';

const artistsRouter = Router();

artistsRouter.get('/', getArtists);
artistsRouter.get('/:id', getArtist);
artistsRouter.post('/', createArtist);
artistsRouter.patch('/:id', updateArtist);
artistsRouter.delete('/:id', deleteArtist);

export default artistsRouter;
