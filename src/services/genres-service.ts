import { Genre } from '../types';
import ApiService from './api-service';

const fetchGenres = async (): Promise<Genre[]> => {
  const { data } = await ApiService.get<{ genres: Genre[] }>('/api/genres');
  return data.genres;
};

const GenresService = {
  fetchGenres,
};

export default GenresService;
