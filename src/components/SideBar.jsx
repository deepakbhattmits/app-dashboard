/** @format */
const SideBar = () => {
	return (
		<>
			<div className='ui list'>
				<div className='item'>
					<div className='left floated content'>
						<a href='#'>Filters</a>
					</div>
					<div className='right floated'>
						<i className='angle double left icon large'></i>
					</div>
				</div>
				<div className='item'>
					<div className='left floated content'>
						<a href='#'>Structure</a>
					</div>
					<div className='right floated'>
						<i className='angle double down icon large'></i>
					</div>
				</div>
				<div className='item'>
					<div className='left floated content'>
						<a href='#'>Moniter Status</a>
					</div>
					<div className='right floated'>
						<i className='angle double down icon large'></i>
					</div>
				</div>
				<div className='item'>
					<div className='left floated content'>
						<a href='#'>More</a>
					</div>
					<div className='right floated'>
						<i className='angle double down icon large'></i>
					</div>
				</div>
			</div>
		</>
	);
};
export default SideBar;
