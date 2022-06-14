/* eslint-disable import/prefer-default-export */
import { RootState } from '../../redux-types';

export const selectNavigationNext = (state: RootState) => state.navigation.next;
