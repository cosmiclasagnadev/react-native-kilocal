export const validate = () => {
  setErrors({});
  if (
    String(formData.email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) === false
  ) {
    setErrors({...errors, email: "Invalid email"});
    return false;
  } else if (formData.email === undefined || "") {
    setErrors({...errors, email: "Email is required"});
    return false;
  } else if (formData.password === undefined) {
    setErrors({...errors, password: "Password is required"});
    return false;
  } else if (formData.password.length < 6) {
    setErrors({
      ...errors,
      password: "Password must be at least 6 characters",
    });
    return false;
  } else if (formData.password !== formData.confirm) {
    setErrors({...errors, confirm: "Passwords must match"});
    return false;
  } else if (formData.name.length < 3) {
    setErrors({...errors, name: "Name is too short"});
    return false;
  } else if (formData.name === undefined) {
    setErrors({...errors, name: "Name is required"});
  }
  return true;
};

export const authFunction = async (type, email, password) => {
  setLoading(type);
  const {error, user} =
    type === "LOGIN"
      ? await supabase.auth.signIn({email, password})
      : await supabase.auth.signUp({email, password});
  if (!error && !user) Alert.alert("Check your email for the login link!");
  if (error) Alert.alert(error.message);
  setLoading("");
};
