import { combineReducers } from 'redux';
import { getData } from '../store/reducers';
//   combineReducers from redux
export const store = combineReducers({
	data: getData,
});