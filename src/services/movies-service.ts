import { Movie } from '../types';
import { ApiServiceBE, handleError } from './api-service';

const fetchMovies = async (genre = 'all'): Promise<Movie[]> => {
  try {
    const { data } = await ApiServiceBE.get(`/api/movies?genre=${genre}`);
    return data.movies;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

const MoviesService = {
  fetchMovies,
};

export default MoviesService;
