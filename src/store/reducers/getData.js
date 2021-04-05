/** @format */

import { pipeConstants } from '../../constants';

const initialState = {
	pipes: [],
	error: '',
};
export const getData = (state = { initialState }, { type, payload }) => {
	switch (type) {
		case pipeConstants.GET_PIPES:
			return { ...state, pipes: payload };
		case pipeConstants.ERROR:
			return { ...state, error: payload };
		default:
			return state;
	}
};
