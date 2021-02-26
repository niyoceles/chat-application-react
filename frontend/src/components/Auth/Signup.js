import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../layout/AuthLayout';

import './auth.css';

export default function Signup() {
	const [user, setUser] = useState({
		username: '',
		password: '',
		confirmPassword: '',
	});

	const createAccount = () => {};

	return (
		<AuthLayout>
			<div className='auth-container'>
				<h1 className='heading'>Create an Account</h1>
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
						value={user.password}
						onChange={event => setUser(event.target.value)}
					/>
				</div>
				<div>
					<input
						placeholder='confirm password'
						className='auth-input mt-20'
						type='password'
						value={user.password}
						onChange={event => setUser(event.target.value)}
					/>
				</div>
				<button
					className={'button mt-20'}
					type='submit'
					onClick={createAccount}
				>
					Sign up
				</button>
				<p className='paragraph'>
					Have an account? <Link to='/'> Login</Link>
				</p>
			</div>
		</AuthLayout>
	);
}
