import { useState } from 'react';
import Cookies from 'js-cookie';

export function LoginForm({ setAuthorized }) {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	function handleLogin(e) {
		setLogin(e.target.value);
	}

	function handlePassword(e) {
		setPassword(e.target.value);
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
				const identifier = data['identifier'];
				Cookies.set('identifier', identifier, { expires: 7, path: '' });
				setAuthorized(true);
			})
      .catch((error) => {
        console.log('error:', error)
      });
		// TODO добавить отображение ошибки при неправильных кредах
	}

	const buttonEnabled = login.length > 5 && password.length > 5;

	return (
		<div>
			<form>
				<h1>Authorization</h1>
				<label>
					Login <br></br>
					<input
						type='text'
						name='login'
						placeholder='enter your login'
						value={login}
						onChange={handleLogin}
					/>
				</label>
				<label>
					Password <br></br>
					<input
						type={showPassword ? 'text' : 'password'}
						name='password'
						placeholder='enter your password'
						value={password}
						onChange={handlePassword}
						minLength={6}
					/>
				</label>
				{password && (
					<span onClick={toggleShowPassword}>{showPassword ? 'hide password' : 'show password'}</span>
				)}
				<button onClick={handleLoginInSystem} disabled={!buttonEnabled}>
					Log In
				</button>
			</form>
		</div>
	);
}
