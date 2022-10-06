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

import {supabase} from "../supabase/initSupabase";
import React from "react";

export default function RegisterScreen({navigation}) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleSignOut = async () => {
    const {error} = await supabase.auth.signOut();
    if (error) Alert.alert(error.message);
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
          <Button
            backgroundColor="primary.100"
            _text={{color: "primary.300", fontWeight: "700"}}
            _pressed={{bg: "primary.200"}}
            width="75%"
            size="md"
            onPress={handleSignOut}
          >
            Sign Out
          </Button>
        </VStack>
      </Box>
    </KeyboardAvoidingView>
  );
}
