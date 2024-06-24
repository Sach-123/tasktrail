import React, { useState } from 'react'
import { createContext } from 'react';
import axios from 'axios'
export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    axios.post('/api/v1/users/check-login', {}, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
        console.log("Error checking login status", error)
    })

  return (
    <AuthContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
        {children}
    </AuthContext.Provider>
  )
}
