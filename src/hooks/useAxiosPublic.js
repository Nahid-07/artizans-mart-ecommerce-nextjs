'use client'; // Required since this is often used inside client components

import axios from "axios";

// Using environment variable with your Render URL as a fallback
export const axiosPublic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;