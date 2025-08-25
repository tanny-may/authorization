import { useState } from 'react';

export function LoginForm({ authorize }) {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [loginError, setLoginError] = useState('');
	const [passwordError, setPasswordError] = useState('');

	function handleLogin(event) {
		setLogin(event.target.value);

		if (isLoginValid(event.target.value)) {
			setLoginError('');
		} else {
			setLoginError('Логин может содержать только латинские буквы и цифры');
		}
	}

	function handlePassword(event) {
		setPassword(event.target.value);

		if (isPasswordValid(event.target.value)) {
			setPasswordError('');
		} else {
			setPasswordError('Пароль может содержать только латинские буквы, цифры и спец.символы');
		}
	}

	function toggleShowPassword() {
		setShowPassword((val) => !val);
	}

	function handleLoginInSystem(e) {
		e.preventDefault();

		const headers = new Headers();
		const basicAuth = btoa(`${login}:${password}`);
		headers.append('Authorization', 'Basic ' + basicAuth);

		fetch('https://dci.ostcard.su/api/login/', {
			method: 'POST',
			headers: headers,
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Ошибка: ' + response.status);
				}
				return response.json();
			})
			.then((data) => {
				authorize(data['identifier']);
			})
			.catch((error) => {
				console.log('error:', error);
			});
	}

	const buttonEnabled = login.length > 5 && password.length > 5;

	return (
		<div>
			<form>
				<h1>Authorization</h1>
				<label>
					<input
						type='text'
						name='login'
						placeholder='enter your login'
						value={login}
						onChange={handleLogin}
					/>
				</label>
				{loginError && <span className='error'>{loginError}</span>}
				<label>
					<input
						type={showPassword ? 'text' : 'password'}
						name='password'
						placeholder='enter your password'
						value={password}
						onChange={handlePassword}
						minLength={6}
					/>
				</label>
				{passwordError && <span className='error'>{passwordError}</span>}
				{password && (
					<span onClick={toggleShowPassword} className='hide'>
						{showPassword ? 'hide password' : 'show password'}
					</span>
				)}
				<button onClick={handleLoginInSystem} disabled={!buttonEnabled}>
					Log In
				</button>
			</form>
		</div>
	);
}

function isLoginValid(value) {
	const loginAvailableSymbols = /^[A-Za-z0-9]*$/;
	return loginAvailableSymbols.test(value);
}

function isPasswordValid(value) {
	const passwordAvailableSymbols = /^[A-Za-z0-9!#$%&'*+\-./:=?^_`{|}~]+$/;
	return passwordAvailableSymbols.test(value);
}
