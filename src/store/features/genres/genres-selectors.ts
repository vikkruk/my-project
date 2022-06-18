import { RootState } from '../../redux-types';

const selectGenres = (state: RootState) => state.genres.genres;

export default selectGenres;
