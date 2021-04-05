/** @format */
import { pipeConstants } from '../../constants';

export const getPipes = () => async (dispatch) => {
	const response = await fetch(`/db/pipes.json`);
	const pipes = await response.json();
	if (response.ok) {
		dispatch({
			type: pipeConstants.GET_PIPES,
			payload: pipes.data,
		});
	} else {
		dispatch({
			type: pipeConstants.ERROR,
			payload: 'Oh Something went wrong',
		});
	}
};
