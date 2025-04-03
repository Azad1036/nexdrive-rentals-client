import { createContext, useState } from "react";
import auth from "../utils/firebase";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export const AuthContextProvider = createContext();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  //Google Login
  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };
  // Github Login
  const githubLogin = () => {
    return signInWithPopup(auth, githubProvider);
  };

  const userInfo = { googleLogin, githubLogin };
  return (
    <AuthContextProvider.Provider value={userInfo}>
      {children}
    </AuthContextProvider.Provider>
  );
};

export default AuthProvider;
