import React, { useState, useEffect, useMemo } from 'react';
import Auth from './pages/Auth';
import { getToken, decodeToken, removeToken } from './utils/token';
import AuthContext from './context/AuthContext';
import Navigation from './routes/Navigation';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
	const [ auth, setAuth ] = useState(undefined);
	useEffect(() => {
		const token = getToken();
		if (!token) {
			setAuth(null);
		} else {
			setAuth(decodeToken(token));
		}
	}, []);

	const logout = () => {
		removeToken();
		setAuth(null);
	};
	const setUser = (user) => {
		setAuth(decodeToken(user));
	};
	const authData = useMemo(
		() => ({
			auth,
			logout,
			setUser
		}),
		[ auth ]
	);
	if (auth === undefined) return null;
	return (
		<AuthContext.Provider value={authData}>
			<div>{!auth ? <Auth /> : <Navigation />}</div>
		</AuthContext.Provider>
	);
}

export default App;
