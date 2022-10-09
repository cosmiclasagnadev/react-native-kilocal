import React from "react";
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

const HomeScreen = () => {
  const handleSignOut = async () => {
    const {error} = await supabase.auth.signOut();
    if (error) Alert.alert(error.message);
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
        <Heading size="2xl" color="white">
          Home Screen
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
  );
};

export default HomeScreen;
