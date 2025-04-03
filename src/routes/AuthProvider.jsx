import { createContext, useState } from "react";
import auth from "../utils/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const AuthContextProvider = createContext();
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [toggleTheme, setToggleTheme] = useState("light");

  //Google Login
  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };
  //   // Github Login
  //   const githubLogin = () => {
  //     return signInWithPopup(auth, githubProvider);
  //   };

  const userInfo = { toggleTheme, setToggleTheme, googleLogin };
  return (
    <AuthContextProvider.Provider value={userInfo}>
      {children}
    </AuthContextProvider.Provider>
  );
};

export default AuthProvider;
