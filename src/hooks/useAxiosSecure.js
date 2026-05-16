import axios from "axios";
import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context_API/authContext"; // FIXED: Imported your AuthContext directly

const axiosSecure = axios.create({
  // Use your environment variable, fallback to the render URL if it fails
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://artizans-mart-ecommerce-server.onrender.com"
});

const useAxiosSecure = () => {
  const router = useRouter();
  // FIXED: Using useContext instead of the missing useAuth hook
  const { logOut } = useContext(AuthContext) || {}; 

  useEffect(() => {
    // Request interceptor to add authorization header for every secure call to the API
    const requestInterceptor = axiosSecure.interceptors.request.use(function (config) {
      const token = localStorage.getItem('access-token');
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    }, function (error) {
      return Promise.reject(error);
    });

    // Intercept 401 and 403 responses
    const responseInterceptor = axiosSecure.interceptors.response.use(function (response) {
      return response;
    }, async (error) => {
      const status = error.response?.status;
      // If token is expired or invalid, log the user out and kick them to login
      if (status === 401 || status === 403) {
        if (logOut) {
            await logOut();
        }
        router.push('/login_user');
      }
      return Promise.reject(error);
    });

    // Cleanup function to prevent memory leaks or duplicate interceptors in Next.js strict mode
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut, router]);

  return axiosSecure;
};

export default useAxiosSecure;