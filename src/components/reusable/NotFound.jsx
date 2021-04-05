/** @format */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// NotFound
export const NotFound = () => {
	const [hover, setHover] = useState(false);
	const toggleHover = () => {
		setHover(!hover);
	};
	return (
		<div className='loading'>
			<h2 className='ui header'>OOPS something went wrong...</h2>
			<Link
				className={`${hover ? 'hovered' : 'unhover'}`}
				to='/'
				onMouseEnter={toggleHover}
				onMouseLeave={toggleHover}>
				<i className={`icon hand point left ${hover ? '' : 'outline'}`} /> Go To
				Home
			</Link>
		</div>
	);
};
