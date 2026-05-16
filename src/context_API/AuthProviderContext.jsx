'use client';
import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import { AuthContext } from "./authContext";
import useAxiosPublic from "@/hooks/useAxiosPublic";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const axiosPublic = useAxiosPublic();

export const AuthProviderContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUserWithEmailPass = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithEmailPass = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  // google signIn
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
// update the user profile
  const updateUserProfile = (name) => {
    setLoading(true);
    return updateProfile(auth.currentUser, name);
  };
  // 3. User State Observer
 useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // 1. User logged in! Ask backend for a token
        const userInfo = { email: currentUser.email };
        
        axiosPublic.post('/jwt', userInfo)
          .then((res) => {
            if (res.data.token) {
              // 2. Save the token to localStorage!
              localStorage.setItem('access-token', res.data.token);
            }
            setLoading(false);
          })
          .catch((err) => {
            console.error("Failed to get JWT token:", err);
            setLoading(false);
          });
          
      } else {
        // 3. User logged out, remove the token
        localStorage.removeItem('access-token');
        setLoading(false);
      }
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUserWithEmailPass,
    signInWithEmailPass,
    logOut,
    signInWithGoogle,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
