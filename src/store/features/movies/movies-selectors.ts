import { RootState } from '../../redux-types';

const selectMoviesAll = (state: RootState) => state.movies.movies;

export default selectMoviesAll;
