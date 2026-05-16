"use client";
import { useContext, useState } from "react";
import { SparklesIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { validateFormRegister } from "@/libs/formValidation";
import { AuthContext } from "@/context_API/authContext";
import { ButtonLoader } from "@/components/loader/ButtonLoader";
import useAxiosPublic from "@/hooks/useAxiosPublic"; // Added hook for API calls

export default function RegisterPage() {
  const router = useRouter();
  const { createUserWithEmailPass, updateUserProfile } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic(); // Initialize the Axios hook

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const saveUserToDatabase = async (name, email) => {
    try {
      // Swapped hardcoded fetch for axiosPublic
      const res = await axiosPublic.post("/users", { name, email });
      
      if (!res.data) {
        throw new Error("Failed to save user data to DB.");
      }
    } catch (err) {
      toast.error(
        `Warning: User registered, but database save failed: ${err.message}`,
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!validateFormRegister(formData, setError)) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailPass(
        formData.email,
        formData.password,
      );
      const user = userCredential.user;
      
      if (user) {
        await updateUserProfile({
          displayName: formData.name,
        });
        await saveUserToDatabase(formData.name, formData.email);
        toast.success("Registration successful!");
      }
      router.push("/");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    // FIXED: Correct Next.js method for going back
    router.back();
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 sm:p-10 relative">
        {/* Go Back Button */}
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
          Create a new account
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Join our community of artisans and craft lovers.
        </p>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Full Name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
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
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
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
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm font-medium text-white transition-colors duration-300 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? <ButtonLoader /> : "Register"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login_user"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}