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

export const computeTERAndMacro = (height, weight, gender, lifestyle) => {
  let multiplier;
  switch (lifestyle) {
    case "Sedentary":
      {
        multiplier = 30;
      }
      break;
    case "Light":
      {
        multiplier = 35;
      }
      break;
    case "Moderate":
      {
        multiplier = 40;
      }
      break;
    case "Active": {
      multiplier = 45;
    }
  }

  // ignore prettier here
  // prettier-ignore
  const BMR = (9.99 * weight) + (6.25 * height) - (4.92 * multiplier);
  const genderFactoredInBMR = gender === "Male" ? BMR + 5 : BMR - 161;
  // round to nearest 50;

  const quotient = Math.round(genderFactoredInBMR / 50);
  const finalBMR = quotient * 50;

  // get User's TER
  let PAMultiplier;
  switch (lifestyle) {
    case "Sedentary":
      {
        PAMultiplier = 1.3;
      }
      break;
    case "Light":
      {
        PAMultiplier = gender === "Male" ? 1.58 : 1.45;
      }
      break;
    case "Moderate":
      {
        PAMultiplier = gender === "Male" ? 1.67 : 1.55;
      }
      break;
    case "Active": {
      PAMultiplier = gender === "Male" ? 1.88 : 1.75;
    }
  }
  const TER = finalBMR * PAMultiplier;
  const TERQuotient = Math.round(TER / 50);
  const finalTER = TERQuotient * 50;

  const carbs = finalTER * 0.65;
  const protein = finalTER * 0.15;
  const fat = finalTER * 0.2;

  const finalCarbs = (carbs / 4).toFixed(0);
  const finalProtein = (protein / 4).toFixed(0);
  const finalFat = (fat / 9).toFixed(0);

  return {finalTER, finalCarbs, finalProtein, finalFat};
};
