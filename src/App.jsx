import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { UserPage } from './UserPage';
import Cookies from 'js-cookie';

function App() {
	const [authorized, setAuthorized] = useState(!!Cookies.get('identifier'));

	function authorize(identifier) {
		Cookies.set('identifier', identifier, { expires: 7, path: '' });
		setAuthorized(true);
	}

	function unAuthorize() {
		Cookies.remove('identifier');
		setAuthorized(false);
	}

	if (!authorized) {
		return <LoginForm authorize={authorize} />;
	}
	return <UserPage unAuthorize={unAuthorize}/>;
}

export default App;