/** @format */

/**
 *	@param getDateTimeString function
 **/

//  util getDateTimeString

export const getDateTimeString = () => {
	const date = new Date();
	return date.toLocaleString().replace(',', ''); // it's upto you how you want to display date
};
