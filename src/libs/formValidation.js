export const validateFormRegister = (formData,setError) => {
  if (
    !formData.name ||
    !formData.email ||
    !formData.password ||
    !formData.confirmPassword
  ) {
    setError("All fields are required.");
    return false;
  }
  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match.");
    return false;
  }
  if (formData.password.length < 6) {
    setError("Password must be at least 6 characters long.");
    return false;
  }
  setError("");
  return true;
};

export const validateFormLogin = (formData,setError) => {
  if (!formData.email || !formData.password) {
    setError("Email and password are required.");
    return false;
  }
  setError("");
  return true;
};
