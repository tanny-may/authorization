import { useState } from 'react';

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
		setAuthorized(true);
		fetch('login', login, password);
	}

	const buttonEnabled = login.length > 5 && password.length > 5;

	return (
		<div>
			<form>
				<h1>Login Here</h1>
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
				{password && <span onClick={toggleShowPassword}>{showPassword ? 'hide password' : 'show password' }</span>}
				<button onClick={handleLoginInSystem} disabled={!buttonEnabled}>
					Log In
				</button>
			</form>
		</div>
	);
}

function fetch(...args) {
	console.log('Data:', args);
}