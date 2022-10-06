import {View, Text} from "react-native";
import {
  Box,
  Heading,
  FormControl,
  Input,
  Stack,
  Link,
  Button,
  VStack,
} from "native-base";
import React from "react";

export default function LoginScreen({navigation}) {
  return (
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
        <FormControl w="75%" maxW="300px">
          <Stack>
            <FormControl.Label>Email</FormControl.Label>
            <Input size="lg" type="email" placeholder="Enter your email" />
          </Stack>
          <Stack>
            <FormControl.Label>Password</FormControl.Label>
            <Input size="lg" type="password" placeholder="Enter password" />
          </Stack>
        </FormControl>
        <Button
          backgroundColor="primary.100"
          _text={{color: "primary.300", fontWeight: "700"}}
          _pressed={{bg: "primary.200"}}
          width="75%"
          size="md"
          onPress={() => {
            alert("Log In");
          }}
        >
          Log In
        </Button>
        <Link
          _text={{color: "primary.100"}}
          _pressed={{color: "primary.300"}}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          Don't have an account?
        </Link>
      </VStack>
    </Box>
  );
}
