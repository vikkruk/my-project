import { ArtistRole } from '../types';
import ApiService from './api-service';

const fetchArtistRoles = async (): Promise<ArtistRole[]> => {
  const { data } = await ApiService.get<{ artistRoles: ArtistRole[] }>('/api/artist-roles');
  return data.artistRoles;
};

const ArtistRolesService = {
  fetchArtistRoles,
};

export default ArtistRolesService;
