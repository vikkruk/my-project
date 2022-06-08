import { Router } from 'express';
import { createArtistRole, getArtistRole, getArtistRoles } from '../controllers/artist-roles-controller';

const artistRolesRouter = Router();

artistRolesRouter.get('/', getArtistRoles);
artistRolesRouter.get('/:id', getArtistRole);
artistRolesRouter.post('/', createArtistRole);

export default artistRolesRouter;
