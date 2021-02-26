import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../layout/AuthLayout';

import './auth.css';

export default function Login() {
	const [user, setUser] = useState({
		username: '',
		password: '',
	});

	const submitLogin = () => {};

	return (
		<AuthLayout>
			<div className='auth-container'>
				<h1 className='heading'>Login </h1>
				<div>
					<input
						placeholder='username'
						className='auth-input'
						type='text'
						value={user.username}
						onChange={event => setUser(event.target.value)}
					/>
				</div>
				<div>
					<input
						placeholder='password'
						className='auth-input mt-20'
						type='password'
						onChange={event => setUser(event.target.value)}
					/>
				</div>
				<button className={'button mt-20'} type='submit' onClick={submitLogin}>
					Sign In
				</button>
				<p className='paragraph'>
					Don't have an account? <Link to='/signup'> Signup</Link>
				</p>
			</div>
		</AuthLayout>
	);
}
