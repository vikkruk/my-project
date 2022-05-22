import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './types';

// const useRootSelector = <Selected = unknown>(selector: (state: State) => Selected) => useSelector<State, Selected>(selector);

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useRootDispatch = () => useDispatch<AppDispatch>();
