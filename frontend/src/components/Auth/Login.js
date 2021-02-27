import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../layout/AuthLayout';
import { loginUser } from '../../redux/actions';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './auth.css';

export default function Login() {
	const [user, setUser] = useState({
		username: '',
		password: '',
	});
	const [submitted, setSubmitted] = useState(false);
	const logging = useSelector(state => state.auth.loginData);
	const loginFailure = useSelector(state => state.auth.loginFailure);
	const loginSuccess = useSelector(state => state.auth.loginSuccess);

	const dispatch = useDispatch();

	const handleChange = e => {
		const { name, value } = e.target;
		setUser(user => ({ ...user, [name]: value }));
	};

	const handleSubmit = e => {
		e.preventDefault();

		setSubmitted(true);
		if (user.username && user.password) {
			dispatch(loginUser(user));
		}
	};

	if (loginSuccess) {
		return <Redirect to='/users' />;
	}

	return (
		<AuthLayout>
			<div className='auth-container'>
				<h1 className='heading'>Login </h1>
				<div>
					<input
						placeholder='username'
						className='auth-input'
						type='text'
						name='username'
						// value={user.username}
						onChange={handleChange}
					/>
				</div>
				<div>
					<input
						name='password'
						placeholder='password'
						className='auth-input mt-20'
						type='password'
						onChange={handleChange}
					/>
				</div>
				<button className={'button mt-20'} type='submit' onClick={handleSubmit}>
					Sign In
				</button>
				{loginFailure && <span>{loginFailure}</span>}
				<p className='paragraph'>
					Don't have an account? <Link to='/signup'> Signup</Link>
				</p>
			</div>
		</AuthLayout>
	);
}
