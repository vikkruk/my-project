import { Movie } from '../types';
import ApiService, { handleError } from './api-service';

const fetchMovies = async (genre = 'all'): Promise<Movie[]> => {
  try {
    const { data } = await ApiService.get<{ movies: Movie[] }>(`/api/movies?genre=${genre}`);
    return data.movies;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

const fetchRandomMovieImage = async (): Promise<string> => {
  try {
    const { data } = await ApiService.get<{ randomImage: string }>('/api/movies/get-random-image');
    return data.randomImage;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

const MoviesService = {
  fetchMovies,
  fetchRandomMovieImage,
};

export default MoviesService;
