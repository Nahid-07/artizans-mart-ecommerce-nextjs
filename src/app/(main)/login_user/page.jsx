"use client";
export const dynamic = 'force-dynamic';


import { useContext, useState, Suspense } from "react"; // Added Suspense here
import { ArrowLeftIcon, SparklesIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthContext } from "@/context_API/authContext";
import { validateFormLogin } from "@/libs/formValidation";
import { ButtonLoader } from "@/components/loader/ButtonLoader";

// Removed "export default" from this component
function LoginForm() {
  const { signInWithEmailPass, signInWithGoogle } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFormLogin(formData, setError)) {
      return;
    }
    setLoading(true);
    setError(null);

    try {
      await signInWithEmailPass(formData.email, formData.password);
      router.push(redirectUrl);
    } catch (err) {
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/wrong-password" ||
        err.code === "auth/user-not-found"
      ) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError(
          err.message || "An unexpected error occurred. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    router.back(); 
  };

  const handleGoogleLogin = async () => {
    setError(null);

    try {
      await signInWithGoogle();
      router.push(redirectUrl);
    } catch (err) {
      setError(err.message || "Google login failed. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 sm:p-10 relative">
        <button
          onClick={handleGoBack}
          className="absolute top-4 left-4 p-2 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>

        <div className="flex justify-center mb-6">
          <SparklesIcon className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-2">
          Log in to your account
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Welcome back! Please enter your details.
        </p>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="mb-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-lg shadow-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-300"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="48px"
              height="48px"
            >
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.613,4.195-5.918,7.243-10.303,7.243c-6.652,0-12.042-5.39-12.042-12.042 c0-6.653,5.39-12.042,12.042-12.042c3.483,0,6.619,1.52,8.749,3.747l5.221-5.221C34.331,6.591,29.627,4,24,4 C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.61,43.83,21.319,43.611,20.083z" />
              <path fill="#FF3D00" d="M6.306,14.691l6.115,4.249c-1.399,4.137-0.783,8.966,1.545,12.42l-6.108,4.256 C2.88,32.355,1.06,28.275,1.06,24C1.06,19.213,2.696,14.77,6.306,14.691z" />
              <path fill="#4CAF50" d="M24,44c5.166,0,9.986-1.979,13.627-5.39l-6.11-4.246c-2.422,2.378-5.74,3.839-9.517,3.839 c-4.635,0-8.527-2.736-10.398-6.602l-6.115,4.249C10.749,40.89,16.891,44,24,44z" />
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.226,4.209-4.138,5.64l6.115,4.249 C41.6,33.102,44,28.755,44,24C44,22.61,43.83,21.319,43.611,20.083z" />
            </svg>
            <span>Sign in with Google</span>
          </button>
        </div>

        <div className="relative flex items-center mb-6">
          <div className="grow border-t border-gray-300"></div>
          <span className="shrink mx-4 text-gray-500 text-sm font-medium">OR</span>
          <div className="grow border-t border-gray-300"></div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500 font-medium">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm font-medium text-white transition-colors duration-300 ${
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? <ButtonLoader /> : "Log In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link href="/register_user" className="font-medium text-blue-600 hover:text-blue-500">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// This is the ONLY default export now!
export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 font-bold">Loading Secure Login...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}