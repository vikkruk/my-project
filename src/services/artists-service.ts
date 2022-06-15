import { Artist, FavoredArtist } from '../types';
import { ApiServiceBE, handleError } from './api-service';

const fetchArtists = async (role: string): Promise<Artist[]> => {
  try {
    const { data } = await ApiServiceBE.get(`/api/artists?role=${role}`);
    return data.artists;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

const fetchFavoredArtists = async (artistRole: string, token: string): Promise<FavoredArtist[]> => {
  try {
    const { data } = await ApiServiceBE
      .get<{ favoredArtists: FavoredArtist[] }>(`/api/fav-artists/get-fav-artists?artistRole=${artistRole}`, {
        headers: {
          Authorization: token,
        },
      });
    return data.favoredArtists;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

const ArtistsService = {
  fetchArtists,
  fetchFavoredArtists,
};

export default ArtistsService;
