'use client' // この行を追加

import React, { createContext, useState } from "react";

export const LoginUserContext = createContext({});

export const LoginUserProvider = (props) => {
    const { children } = props;
    const [loginUser, setLoginUser] = useState(null); 
    const [isLogined, setIsLogined] = useState(false); 
  
    return (
      <LoginUserContext.Provider value={{ loginUser, setLoginUser, isLogined, setIsLogined}}>
        {children}
      </LoginUserContext.Provider>
    );
  };
