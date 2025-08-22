import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { UserPage } from './UserPage';


function App() {
  const [authorized, setAuthorized] = useState(false);

    if (!authorized) {
      return <LoginForm setAuthorized={setAuthorized} />;
    }
    return <UserPage setAuthorized={setAuthorized} />;
  }

export default App;