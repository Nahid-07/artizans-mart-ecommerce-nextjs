'use client';

import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context_API/authContext";
import { useRouter } from "next/navigation";

// Create a dedicated Axios instance
const axiosSecure = axios.create({
  // Make sure this matches your actual backend URL!
  baseURL: "http://localhost:5000", 
  withCredentials: true 
});

const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    // 1. REQUEST INTERCEPTOR: Attach the token before the request leaves the frontend
    const requestInterceptor = axiosSecure.interceptors.request.use(
      function (config) {
        // Grab the token from wherever you saved it (usually localStorage)
        const token = localStorage.getItem('access-token');
        
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    // 2. RESPONSE INTERCEPTOR: Catch security errors coming back from the server
    const responseInterceptor = axiosSecure.interceptors.response.use(
      function (response) {
        // If the response is good, just pass it through
        return response;
      },
      async (error) => {
        const status = error.response?.status;
        
        // If the backend's varifyToken.js rejects it (401 Unauthorized or 403 Forbidden)
        if (status === 401 || status === 403) {
          console.error("Security caught an invalid/expired token. Logging user out.");
          await logOut(); // Force log them out
          router.push('/login_user'); // Kick them back to the login page
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors when the component unmounts
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut, router]);

  return axiosSecure;
};

export default useAxiosSecure;