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
import useAxiosSecure from "../hooks/useAxiosSecure";

export const AuthContextProvider = createContext();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  // Create New Account
  const createNewAccount = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login Account
  const loginAccount = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //Google Login
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  // Github Login
  const githubLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  // Update Profile
  const updateUserProfile = (updateData) => {
    setLoading(true);
    return updateProfile(auth.currentUser, updateData);
  };

  // SignOut User
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  const userInfo = {
    user,
    setUser,
    loading,
    createNewAccount,
    loginAccount,
    updateUserProfile,
    googleLogin,
    githubLogin,
    signOutUser,
  };

  // user Store
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        setUser(currentUser);
        await axiosSecure.post(`/jwt`, { email: currentUser?.email });
      } else {
        setUser(currentUser);
        await axiosSecure.get("/logoutCookie");
      }
      setLoading(false);
    });
    return () => unSubscribe();
  }, [axiosSecure]);

  return (
    <AuthContextProvider.Provider value={userInfo}>
      {children}
    </AuthContextProvider.Provider>
  );
};

export default AuthProvider;
