import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { UserPage } from './UserPage';
import Cookies from 'js-cookie';

function App() {
	const [authorized, setAuthorized] = useState(!!Cookies.get('identifier'));

	if (!authorized) {
		return <LoginForm setAuthorized={setAuthorized} />;
	}
	return <UserPage setAuthorized={setAuthorized} />;
}

export default App;
