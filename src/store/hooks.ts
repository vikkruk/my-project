import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './types';

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useRootDispatch = () => useDispatch<AppDispatch>();
