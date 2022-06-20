import { ArtistsPageType } from '../store/features/artists/artists-types';
import { AddArtistData, Artist, FavoredArtist } from '../types';
import ApiService, { handleError } from './api-service';

const fetchArtists = async (role: string, gender?: string): Promise<Artist[]> => {
  const fetchUrl = (gender !== 'all' && gender !== undefined)
    ? `/api/artists?role=${role}&gender=${gender}`
    : `/api/artists?role=${role}`;
  try {
    const { data } = await ApiService.get<{ artists: Artist[] }>(fetchUrl);
    return data.artists;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

const fetchFavoredArtists = async (artistRole: ArtistsPageType, token: string, gender?: string): Promise<FavoredArtist[]> => {
  const fetchUrl = (gender !== 'all' && gender !== undefined)
    ? `/api/fav-artists/get-fav-artists?artistRole=${artistRole}&gender=${gender}`
    : `/api/fav-artists/get-fav-artists?artistRole=${artistRole}`;
  try {
    const { data } = await ApiService
      .get<{ favoredArtists: FavoredArtist[] }>(fetchUrl, {
        headers: {
          Authorization: token,
        },
      });

    return data.favoredArtists;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

const createArtist = async (artistData: AddArtistData, token: string): Promise<{ artist: Artist }> => {
  try {
    const response = await ApiService.post<{ artist: Artist }>('/api/artists', artistData, {
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

const deleteArtist = async (artistId: string, token: string): Promise<void> => {
  try {
    await ApiService.delete(`/api/artists/${artistId}`, {
      headers: {
        Authorization: token,
      },
    });
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
  createArtist,
  deleteArtist,
  addFavoredArtist,
  removeFavoredArtist,
};

export default ArtistsService;
