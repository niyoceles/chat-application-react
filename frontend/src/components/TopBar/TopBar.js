import React from 'react';
import { Link } from 'react-router-dom';

import './top-bar.css';

const TopBar = props => (
	<div className='top-bar'>
		<div className='left-container'>
			<Link to='/users' className='link'>
				<button className='button back-button'>
					<b>&#8249;&#8249; Back</b>
				</button>
			</Link>
			<h3> {props.title}</h3>
		</div>
	</div>
);

export default TopBar;
