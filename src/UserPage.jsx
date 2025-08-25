/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export function UserPage({ unAuthorize }) {
	let [userData, setUserData] = useState({});

	async function updateUserData() {
		const headers = new Headers();
		headers.append('Authorization', Cookies.get('identifier'));

		await fetch('https://dci.ostcard.su/api/login/user', {
			method: 'GET',
			headers: headers,
		})
			.then((response) => {
				if (!response.ok) {
					unAuthorize();
					throw new Error('Ошибка: ' + response.status);
				}
				return response.json();
			})
			.then((updatedData) => {
				setUserData(updatedData);
			})
			.catch((error) => {
				console.log('error:', error);
			});
	}

	useEffect(() => {
		updateUserData();

		const intervalId = setInterval(() => {
			updateUserData();
		}, 10000);

		return () => clearInterval(intervalId);
	}, []);

	function handleLogout(e) {
		const headers = new Headers();
		headers.append('Authorization', Cookies.get('identifier'));
		e.preventDefault();

		fetch('https://dci.ostcard.su/api/login/logout', {
			method: 'GET',
			headers: headers,
		}).then(() => {
			unAuthorize();
		});
	}

	return (
		<div>
			<form>
				<h2>My info</h2>
				<div className='info'>
					<p>
						Name: <b>{userData.name}</b>
					</p>
					<p>
						Bank name: <b>{userData.bankName}</b>
					</p>
					<p>
						Type: <b>{userData.typeName}</b>
					</p>
					<p>
						Description: <b>{userData.description}</b>
					</p>
				</div>
				<button onClick={handleLogout}>Log Out</button>
			</form>
		</div>
	);
}
