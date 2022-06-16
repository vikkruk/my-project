import { ArtistsPageType } from '../store/features/artists/artists-types';
import { Artist, FavoredArtist } from '../types';
import ApiService, { handleError } from './api-service';

const fetchArtists = async (role: string): Promise<Artist[]> => {
  try {
    const { data } = await ApiService.get(`/api/artists?role=${role}`);
    return data.artists;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

const fetchFavoredArtists = async (artistRole: ArtistsPageType, token: string): Promise<FavoredArtist[]> => {
  try {
    const { data } = await ApiService
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

const addFavoredArtist = async (artistId: string, type: ArtistsPageType, token: string): Promise<void> => {
  try {
    await ApiService.post(`/api/fav-artists/add-fav-artist?artistRole=${type}`, {
      artistId,
    }, {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    throw new Error(handleError(error));
  }
};

const removeFavoredArtist = async (artistId: string, type: ArtistsPageType, token: string): Promise<void> => {
  try {
    await ApiService.delete(
      `/api/fav-artists/remove-fav-artist/${artistId}?artistRole=${type}`,
      {
        headers: {
          Authorization: token,
        },
      },
    );
  } catch (error) {
    throw new Error(handleError(error));
  }
};

const ArtistsService = {
  fetchArtists,
  fetchFavoredArtists,
  addFavoredArtist,
  removeFavoredArtist,
};

export default ArtistsService;
