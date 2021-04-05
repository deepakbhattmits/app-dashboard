/** @format */

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MainSection from './MainSection';
import SideBar from './SideBar';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { getPipes } from '../store/actions';

const App = () => {
	const [datas, setDatas] = useState([]);
	const [toggle, setToggle] = useState(false);
	const dispatch = useDispatch();
	const pipes = useSelector((state) => state.data.pipes);

	const { width } = useWindowDimensions();
	const handleChange = (e) => {
		const { value } = e.target;
		if (+value === 1) {
			const filteredData = datas?.sort((a, b) => {
				if (a.modelNumber > b.modelNumber) {
					return 1;
				} else if (a.modelNumber < b.modelNumber) {
					return -1;
				} else {
					return 0;
				}
			});
			setDatas([...filteredData]);
		} else if (+value === 2) {
			const filteredData = datas?.sort((a, b) => {
				if (a.serialNumber > b.serialNumber) {
					return 1;
				} else if (a.serialNumber < b.serialNumber) {
					return -1;
				} else {
					return 0;
				}
			});
			setDatas([...filteredData]);
		}
	};
	const handleToggele = () => {
		setToggle(!toggle);
	};

	useEffect(() => {
		if (!!!pipes) {
			dispatch(getPipes());
		}
		setDatas(pipes);
	}, [dispatch, pipes]);
	return (
		<div className='main'>
			<div className='sidebar-section'>
				{width < 420 ? (
					<button
						className={`toggle-filter-button${toggle ? ' clicked' : ''}`}
						onClick={handleToggele}>
						{toggle ? (
							<i className='icon close'></i>
						) : (
							<>
								<p>F</p>
								<p>I</p>
								<p>L</p>
								<p>T</p>
								<p>E</p>
								<p>R</p>
							</>
						)}
					</button>
				) : (
					''
				)}
				<SideBar />
			</div>
			<div className='main-section'>
				<MainSection pipes={datas} handleChange={handleChange} />
			</div>
		</div>
	);
};
export default App;
