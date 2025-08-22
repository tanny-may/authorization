import { useState } from "react";


export function UserPage({ setAuthorized }) {
  const [login, setLogin] = useState('');

  function handleLogout(e) {
		e.preventDefault();
		setAuthorized(false);
		fetch('logout', login);
	}

  return (
    <div>
      <form>
        <p>You are authorized</p>
        <button onClick={handleLogout}>Log Out</button>
      </form>
      
    </div>
  )
}