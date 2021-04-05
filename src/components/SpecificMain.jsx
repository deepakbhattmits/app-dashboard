/** @format */
import { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Line as LineChart } from 'react-chartjs-2';
import { getDateTimeString } from '../helpers';
import useWindowDimensions from '../hooks/useWindowDimensions';
const SpecificMain = () => {
	let history = useHistory();

	const [chart, setChart] = useState({});
	const [toggle, setToggle] = useState(false);
	const [active, setActive] = useState('');
	const { width } = useWindowDimensions();
	const handleToggele = () => {
		setToggle(!toggle);
	};

	const {
		params: { id },
	} = useRouteMatch();
	function handleClick() {
		history.push('/');
	}
	const handleProperty = (title) => {
		setActive(title);
	};
	const {
		modelNumber,
		serialNumber,
		name,
		description,
		running,
		alerts,
		weeklyTotal,
		location,
		properties,
	} = useSelector(({ data }) =>
		data?.pipes?.find(({ serialNumber }) => serialNumber === id)
	);
	const calChart = () => {
		properties.find((el) => {
			Object.values(el).map(({ title, chart }) => {
				if (title === active) {
					setChart(chart);
				}
			});
		});
	};

	const options = {
		legend: false,
		responsive: true, // Make it responsive
		maintainAspectRatio: false, // Don't maintain w/h ratio
	};
	useEffect(() => {
		// initially set active to first property
		setActive('Performance');
	}, []);
	useEffect(() => {
		// call this funtion when your property gets changed
		calChart();
	}, [active]);
	return (
		<div className='product--details'>
			<div className='product--details-sidebar'>
				{width < 420 ? (
					<button
						className={`toggle-filter-button${toggle ? ' clicked' : ''}`}
						onClick={handleToggele}>
						{toggle ? (
							<i className='icon close'></i>
						) : (
							<>
								<p>P</p>
								<p>R</p>
								<p>O</p>
								<p>P.</p>
							</>
						)}
					</button>
				) : (
					''
				)}

				<div className='ui list'>
					<div className='item'>
						<button
							type='button'
							className='right floated'
							onClick={handleClick}
							title='Go Back'>
							<i className='icon angle left double large link' />
						</button>
					</div>
					{properties.map((el, index) => {
						return Object.values(el).map(({ title }) => {
							return (
								<div
									key={index}
									className={`item ${active === title ? 'active' : ''}`}
									onClick={() => {
										handleProperty(title);
									}}>
									<div className='content'>
										<span className='pointer bolder'>{title}</span>
									</div>
								</div>
							);
						});
					})}
				</div>
			</div>
			<div className='product--details-list'>
				<div className='list'>
					<div className='top'>
						<span className='link'>{`${name}-${modelNumber}`}</span>
					</div>
					<div className='inner--list details'>
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
									<span>
										<i
											className='check icon green large'
											aria-hidden={true}></i>
										Running :
									</span>
									<span>{running}</span>
								</div>
								<div className='alert-icon'>
									<div className='bell-wrapper'>
										<i className='bell icon white large'></i>
									</div>
									<div className='right'>
										<span>Alerts:</span>
										<span>{alerts}</span>
										<span>Weekly total:</span>
										<span>{weeklyTotal}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='property-chart-wrapper'>
					<div>
						<h3 className='ui header'>{active}</h3>
					</div>
					<div className='list-chart'>
						<div className='ui list'>
							{!!active &&
								properties.map((el, i) => {
									return Object.values(el).map(({ title, data, chart }) => {
										if (title === active) {
											return Object.values(data).map((el1) => {
												return Object.values(el1).map(({ title, value }) => {
													return (
														<div key={i} className='item'>
															<div className='left floated content'>
																<span className=''>{title}</span>
															</div>
															<div className='right floated content'>
																<span className=''>
																	{title === 'Last Updated'
																		? getDateTimeString(value)
																		: value}
																</span>
															</div>
														</div>
													);
												});
											});
										}
									});
								})}
						</div>
						<div className='chart'>
							{!!active && <LineChart data={chart} options={options} />}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default SpecificMain;
