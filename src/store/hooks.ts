import { useSelector } from 'react-redux';
import { State } from './types';

const useRootSelector = <Selected = unknown>(selector: (state: State) => Selected) => useSelector<State, Selected>(selector);

export default useRootSelector;
