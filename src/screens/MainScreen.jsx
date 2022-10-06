import {useState} from "react";
import {View, Text} from "react-native";
import {validate} from "../helpers";
import {
  Box,
  Heading,
  FormControl,
  Input,
  Stack,
  Link,
  Button,
  VStack,
  KeyboardAvoidingView,
} from "native-base";

import React from "react";

export default function RegisterScreen({navigation}) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    setErrors({});
    console.log(formData);
    validate() ? alert("Success") : console.log(JSON.stringify(errors));
  };

  return (
    <KeyboardAvoidingView
      h={{
        base: "100%",
        lg: "auto",
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
        bgColor="primary.300"
        safeArea
      >
        <VStack width="100%" alignItems="center" space="2.5" mt="4" px="8">
          <Heading size="2xl" color="white">
            Authenticated.
          </Heading>
        </VStack>
      </Box>
    </KeyboardAvoidingView>
  );
}
