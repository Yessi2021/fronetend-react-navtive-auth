
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import client from '../api/client';

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({});
  const [loadingPending, setLoadingPending] = useState(false);


  const fetchUser = async () => {
    setLoadingPending(true)
     const token = await AsyncStorage.getItem('token')
  
     if (token !== null) {
       const resp = await client.get('/profile',{
          headers: {
            Authorization: `  JWT ${token}`
          }
        })
        if ( resp.data.success ) {
            setProfile(resp.data.profile)
            setIsLoggedIn(true)
        }else {
          setProfile({})
          setIsLoggedIn(false)
        }
        setLoadingPending(false)
     }else{
      setProfile({})
      setIsLoggedIn(false)
      setLoadingPending(false)
     }
  }

  useEffect(()=>{
    fetchUser()
  },[])

  return (
    <LoginContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, profile, setProfile, setLoadingPending }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;
