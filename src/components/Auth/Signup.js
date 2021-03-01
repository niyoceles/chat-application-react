import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../../layout/AppLayout';

import { signupUser } from '../../redux/actions';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './auth.css';

export default function Signup() {
	const [submitted, setSubmitted] = useState(false);
	const [user, setUser] = useState({
		username: '',
		password: '',
		confirmPassword: '',
	});

	// const submitData = useSelector(state => state.auth.signupData);
	const signupFailure = useSelector(state => state.auth.signupFailure);
	const signupSuccess = useSelector(state => state.auth.signupSuccess);

	const dispatch = useDispatch();

	const handleChange = e => {
		const { name, value } = e.target;
		setUser(user => ({ ...user, [name]: value }));
	};

	const createAccount = e => {
		e.preventDefault();
		setSubmitted(true);
		if (
			user.password &&
			user.username &&
			user.password === user.confirmPassword
		) {
			dispatch(signupUser(user));
		}

		// setUser({ username: '', password: '', confirmPassword: '' });
	};

	if (signupSuccess) {
		return <Redirect to='/users' />;
	}

	if (localStorage.IdToken) {
		return <Redirect to='/users' />;
	}

	return (
		<AppLayout>
			<div className='auth-container'>
				<h1 className='heading'>Create an account</h1>
				<form>
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
					<div>
						<input
							name='confirmPassword'
							placeholder='confirm password'
							className={`auth-input mt-20 ${
								submitted && !user.confirmPassword ? 'validation-error' : ''
							}`}
							type='password'
							value={user.confirmPassword}
							onChange={handleChange}
						/>
						{submitted && !user.confirmPassword ? (
							<span className='validation-error'>confirm is required!</span>
						) : null}
					</div>
					<button
						className={'button mt-20'}
						type='submit'
						onClick={createAccount}
					>
						Sign up
					</button>
				</form>
				{signupFailure && (
					<span className='validation-error'>{signupFailure}</span>
				)}
				{submitted && user.password !== user.confirmPassword ? (
					<span className='validation-error'>password are not matching</span>
				) : null}
				<p className='paragraph'>
					Have an account?{' '}
					<Link to='/' className='links'>
						{' '}
						Login
					</Link>
				</p>
			</div>
		</AppLayout>
	);
}
