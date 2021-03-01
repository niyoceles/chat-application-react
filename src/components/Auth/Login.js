import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../../layout/AppLayout';
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

	if (localStorage.IdToken) {
		return <Redirect to='/users' />;
	}
	return (
		<AppLayout>
			<div className='auth-container'>
				<h1 className='heading'>Login </h1>
				<form className='login-form'>
					<div>
						<input
							placeholder='username'
							className={`auth-input mt-20 ${
								submitted && !user.username ? 'validation-error' : ''
							}`}
							type='text'
							name='username'
							value={user.username}
							onChange={handleChange}
							required
						/>
						{submitted && !user.username ? (
							<span className='validation-error'>username is required!</span>
						) : null}
					</div>
					<div>
						<input
							name='password'
							placeholder='password'
							className={`auth-input mt-20 ${
								submitted && !user.password ? 'validation-error' : ''
							}`}
							type='password'
							value={user.password}
							onChange={handleChange}
							required
						/>
						{submitted && !user.password ? (
							<span className='validation-error'>password is required!</span>
						) : null}
					</div>
					{!logging ? (
						<button
							className={'button mt-20'}
							type='submit'
							onClick={handleSubmit}
						>
							Login
						</button>
					) : null}
				</form>
				<br />
				{loginFailure && (
					<span className='validation-error'>{loginFailure}</span>
				)}
				<br />
				<p className='paragraph'>
					Don't have an account?{' '}
					<Link to='/signup' className='links'>
						{' '}
						Signup
					</Link>
				</p>
			</div>
		</AppLayout>
	);
}
