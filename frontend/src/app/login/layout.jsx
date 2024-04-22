import React from "react";
import { LoginUserProvider } from "../../components/LoginUserProvider";

const Layout = ({children}) => {
  return (
    <LoginUserProvider>
      {children}
    </LoginUserProvider>
  );
};

export default Layout;