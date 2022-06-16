import { RootState } from '../../redux-types';

const selectArtistRoles = (state: RootState) => state.artistRoles.artistRoles;

export default selectArtistRoles;
