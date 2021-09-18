import React, {useEffect, useState, useMemo} from 'react';
import AppNavigation from '@navigation/AppNavigation';
import {getToken, decodeToken, removeToken} from '@recursos/token';
import AuthContext from '@context/AuthContext';
function App() {
  const [auth, setAuth] = useState(undefined);

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
    //setAuth(null);
  };

  const setUser = user => {
    setAuth(decodeToken(user));
  };
  const authData = useMemo(
    () => ({
      auth,
      logout,
      setUser,
    }),
    [auth],
  );
  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <AppNavigation />
    </AuthContext.Provider>
  );
}

export default App;
