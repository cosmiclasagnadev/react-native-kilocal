import {View, Text, Alert} from "react-native";
import {
  Box,
  Heading,
  FormControl,
  Input,
  Stack,
  Link,
  Button,
  VStack,
  Spinner,
} from "native-base";
import React, {useState, useEffect} from "react";
// import {authFunction} from "../helpers";
import {supabase} from "../supabase/initSupabase";

export default function LoginScreen({navigation}) {
  const [loading, setLoading] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authMode, setAuthMode] = useState("login");

  const handleAuthFunction = async (type, email, password) => {
    setLoading(type);
    const {error, user, session} =
      type === "LOGIN"
        ? await supabase.auth.signIn({email, password})
        : await supabase.auth.signUp({email, password});
    if (!error && user && !session)
      Alert.alert("Check your email for the login link!");
    if (error) {
      console.log(error);
      Alert.alert(error.message);
      setLoading("");
    }
    setLoading("");
  };

  return (
    <Box
      flex={1}
      justifyContent="center"
      alignItems="center"
      bgColor="primary.300"
      safeArea
    >
      <VStack width="100%" alignItems="center" space="2.5" mt="4" px="8">
        {loading === "" ? (
          <>
            <Heading size="2xl" color="white">
              kiLocal
            </Heading>
            <FormControl w="75%" maxW="300px">
              {authMode === "login" ? null : (
                <Stack>
                  <FormControl.Label>Username</FormControl.Label>
                  <Input
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    size="lg"
                    type="text"
                    placeholder="Enter your username"
                  />
                </Stack>
              )}
              <Stack>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  size="lg"
                  type="email"
                  placeholder="Enter your email"
                />
              </Stack>
              <Stack>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                  }}
                  size="lg"
                  type="password"
                  placeholder="Enter password"
                />
              </Stack>
            </FormControl>
            {authMode === "login" ? (
              <Button
                backgroundColor="primary.100"
                _text={{color: "primary.300", fontWeight: "700"}}
                _pressed={{bg: "primary.200"}}
                width="75%"
                size="md"
                onPress={() => {
                  handleAuthFunction("LOGIN", email, password);
                }}
              >
                Log In
              </Button>
            ) : (
              <Button
                backgroundColor="primary.100"
                _text={{color: "primary.300", fontWeight: "700"}}
                _pressed={{bg: "primary.200"}}
                width="75%"
                size="md"
                onPress={() => {
                  handleAuthFunction("REGISTER", email, password);
                }}
              >
                Register
              </Button>
            )}
            <Link
              _text={{color: "primary.100"}}
              _pressed={{color: "primary.300"}}
              onPress={() => {
                setAuthMode((prev) => {
                  if (prev === "login") {
                    return "register";
                  } else {
                    return "login";
                  }
                });
              }}
            >
              {authMode
                ? "Already have an account? Log in"
                : "Don't have an account? Register here"}
            </Link>
          </>
        ) : (
          <Spinner color={"primary.100"} size="lg" />
        )}
      </VStack>
    </Box>
  );
}
