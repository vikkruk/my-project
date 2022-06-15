import { Artist } from '../types';
import { ApiServiceBE, handleError } from './api-service';

const fetchArtists = async (role: string): Promise<Artist[]> => {
  try {
    const { data } = await ApiServiceBE.get(`/api/artists?role=${role}`);
    return data.artists;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

const fetchFavoredArtists = async () => {
  console.log('sadas');
};

const ArtistsService = {
  fetchArtists,
  fetchFavoredArtists,
};

export default ArtistsService;
