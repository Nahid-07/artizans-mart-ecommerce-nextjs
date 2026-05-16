'use client';
import { useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthContext } from "@/context_API/authContext";

export const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    // If loading is finished and there is no user, redirect to login
    if (!loading && (!user || !user?.email)) {
      // We pass the current pathname as a query parameter so they can return here after login
      router.push(`/login_user?redirect=${pathname}`);
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-center text-lg font-medium">Loading...</p>
      </div>
    );
  }

  // Prevent rendering the protected content while the redirect is happening
  if (!user || !user?.email) {
    return null; 
  }

  return children;
};