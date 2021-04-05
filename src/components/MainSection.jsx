/** @format */
import { Link } from 'react-router-dom';
import { LoadingSpinner } from './reusable';

const MainSection = ({ pipes, handleChange }) => {
	return (
		<>
			<div className='filter'>
				<span>Sort Order</span>
				<select className='select--bar' onChange={handleChange}>
					<option value={0}>-- Choose Order --</option>

					<option value={1}>Modal</option>

					<option value={2}>Serial</option>
				</select>
				<span>
					{!!pipes ? (
						`1 - ${pipes?.length} of ${pipes?.length} Assets`
					) : (
						<LoadingSpinner />
					)}
				</span>
			</div>
			<ul className='product--list'>
				{pipes?.map(
					({ modelNumber, serialNumber, name, description, location }) => {
						return (
							<Link key={modelNumber} to={`/product-details/${serialNumber}`}>
								<li className='list'>
									<div className='top'>
										<span className='link'>{`${name}-${modelNumber}`}</span>
									</div>
									<div className='inner--list'>
										<div className='left'>
											<img
												src={`/images/${modelNumber}.png`}
												alt={name}
												width={150}
												height={150}
											/>
										</div>
										<div className='middle'>
											<ul className='responsive'>
												<li className='item-row'>
													<p>Model number:</p>
													<p>{modelNumber}</p>
												</li>
												<li className='item-row'>
													<p>Serial number:</p>
													<p> {serialNumber}</p>
												</li>
												<li className='item-row'>
													<p>Description:</p>
													<p> {description}</p>
												</li>
												<li className='item-row'>
													<p>Location:</p>
													<p> {location}</p>
												</li>
											</ul>
										</div>
										<div className='right'>
											<div className='notification'>
												<div className='running-icon'>
													<i className='check icon green large'></i>
													Running :
												</div>
												<div className='alert-icon'>
													<div className='bell-wrapper'>
														<i className='bell icon white large'></i>
													</div>
													<div className='right'>
														<p className='link'>Alerts:</p>
														<p>Weekly total:</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</li>
							</Link>
						);
					}
				)}
			</ul>
		</>
	);
};
export default MainSection;
