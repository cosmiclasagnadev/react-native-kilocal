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
import {authFunction} from "../helpers";

import React from "react";

export default function RegisterScreen({navigation}) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    // setErrors({});
    // console.log(formData);
    // validate()
    //   ? authFunction("REGISTER", formData.email, formData.password)
    //   : console.log(JSON.stringify(errors));
    authFunction("REGISTER", formData.email, formData.password);
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
            kiLocal
          </Heading>
          <FormControl isRequired w="75%" maxW="300px">
            <Stack>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                size="lg"
                type="text"
                placeholder="Enter your email"
                onChangeText={(value) =>
                  setFormData({
                    ...formData,
                    email: value,
                  })
                }
              />
              {"email" in errors ? (
                <FormControl.ErrorMessage _text={{fontSize: "xs"}}>
                  {errors.email}
                </FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText>
                  Enter a valid Email
                </FormControl.HelperText>
              )}
            </Stack>
          </FormControl>
          <FormControl isRequired w="75%" maxW="300px">
            <Stack>
              <FormControl.Label>Name</FormControl.Label>
              <Input
                size="lg"
                type="text"
                placeholder="Enter your full name"
                onChangeText={(value) =>
                  setFormData({
                    ...formData,
                    name: value,
                  })
                }
              />
              {"name" in errors ? (
                <FormControl.ErrorMessage>
                  {errors.name}
                </FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText>
                  Name should contain atleast 3 character.
                </FormControl.HelperText>
              )}
            </Stack>
          </FormControl>
          <FormControl isRequired w="75%" maxW="300px">
            <Stack>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                size="lg"
                type="password"
                placeholder="Enter password"
                onChangeText={(value) =>
                  setFormData({
                    ...formData,
                    password: value,
                  })
                }
              />
              {"password" in errors ? (
                <FormControl.ErrorMessage>
                  {errors.password}
                </FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText>
                  Password should contain atleast 6 character.
                </FormControl.HelperText>
              )}
            </Stack>
          </FormControl>
          <FormControl isRequired w="75%" maxW="300px">
            <Stack>
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input
                size="lg"
                type="password"
                placeholder="Confirm your password"
                onChangeText={(value) =>
                  setFormData({
                    ...formData,
                    confirm: value,
                  })
                }
              />
              {"confirm" in errors ? (
                <FormControl.ErrorMessage>
                  {errors.confirm}
                </FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText>
                  Passwords must match
                </FormControl.HelperText>
              )}
            </Stack>
          </FormControl>

          <Button
            backgroundColor="primary.100"
            _text={{color: "primary.300", fontWeight: "700"}}
            _pressed={{bg: "primary.200"}}
            width="75%"
            size="md"
            onPress={handleSubmit}
          >
            Register
          </Button>
          <Link
            _text={{color: "primary.100"}}
            _pressed={{color: "primary.300"}}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            Already have an account?
          </Link>
        </VStack>
      </Box>
    </KeyboardAvoidingView>
  );
}
