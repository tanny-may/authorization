import { useState } from 'react';

function App() {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [authorized, setAuthorized] = useState(false);

	function handleLogin(e) {
		setLogin(e.target.value);
	}

	function handlePassword(e) {
		setPassword(e.target.value);
	}

	function handleLoginInSystem(e) {
		e.preventDefault();
		setAuthorized(true);
		fetch('login', login, password);
	}

	function handleLogout(e) {
		e.preventDefault();
		setAuthorized(false);
		fetch('logout', login);
	}

	const buttonEnabled = login.length > 5 && password.length > 5;

	if (authorized) {
		return (
			<div>
				<form>
					<h2>Hello, {login}!</h2>
					<p>You are authorized</p>
					<button onClick={handleLogout}>Log Out</button>
				</form>
			</div>
		);
	}

	return (
		<div>
			<form>
				<h1>Login Here</h1>
				<label>
					Login <br></br>
					<input
						type='text'
						name='login'
						placeholder='login'
						value={login}
						onChange={handleLogin}
					/>
				</label>
				<label>
					Password <br></br>
					<input
						type='password'
						name='password'
						placeholder='●●●●●●'
						value={password}
						onChange={handlePassword}
						minLength={6}
					/>
				</label>
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

export default App;