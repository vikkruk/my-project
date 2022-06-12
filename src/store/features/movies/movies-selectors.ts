import { RootState } from '../../types';

const selectMoviesAll = (state: RootState) => state.movies.movies;

export default selectMoviesAll;
