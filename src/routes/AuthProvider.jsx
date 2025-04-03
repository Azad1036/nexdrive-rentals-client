import { createContext, useEffect, useState } from "react";
import auth from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

export const AuthContextProvider = createContext();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log(user);

  // Create New Account
  const createNewAccount = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login Account
  const loginAccount = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //Google Login
  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };
  // Github Login
  const githubLogin = () => {
    return signInWithPopup(auth, githubProvider);
  };

  // Update Profile
  const updateUserProfile = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };

  // SignOut User
  const signOutUser = () => {
    return signOut(auth);
  };

  const userInfo = {
    user,
    setUser,
    createNewAccount,
    loginAccount,
    updateUserProfile,
    googleLogin,
    githubLogin,
    signOutUser,
  };

  // user Store
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unSubscribe();
  }, []);

  return (
    <AuthContextProvider.Provider value={userInfo}>
      {children}
    </AuthContextProvider.Provider>
  );
};

export default AuthProvider;
