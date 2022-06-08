import { Router } from 'express';
import {
  createArtistRole, deleteArtistRole, getArtistRole, getArtistRoles, updateArtistRole,
} from '../controllers/artist-roles-controller';

const artistRolesRouter = Router();

artistRolesRouter.get('/', getArtistRoles);
artistRolesRouter.get('/:id', getArtistRole);
artistRolesRouter.post('/', createArtistRole);
artistRolesRouter.patch('/:id', updateArtistRole);
artistRolesRouter.delete('/:id', deleteArtistRole);

export default artistRolesRouter;
