import { useContext, createContext, useEffect, useState, useMemo } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

// export const UserAuth = () => {
//   return useContext(AuthContext);
// };

export default AuthContext;
