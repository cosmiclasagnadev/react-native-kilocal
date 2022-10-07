import React, {useState} from "react";
import {View, Text, Alert} from "react-native";
import {supabase} from "../supabase/initSupabase";
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

const CreateHealthProfile = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
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
        <Heading size="xl" color="white">
          Create Health Profile
        </Heading>
        <FormControl w="75%" maxW="300px">
          <Stack>
            <FormControl.Label>Height</FormControl.Label>
            <Input
              value={height}
              onChangeText={(text) => setHeight(text)}
              size="lg"
              type="number"
              placeholder="Enter your height"
            />
          </Stack>
          <Stack>
            <FormControl.Label>Weight</FormControl.Label>
            <Input
              value={weight}
              onChangeText={(text) => {
                setWeight(text);
              }}
              size="lg"
              type="number"
              placeholder="Enter your weight"
            />
          </Stack>
        </FormControl>
        <Button
          backgroundColor="primary.100"
          _text={{color: "primary.300", fontWeight: "700"}}
          _pressed={{bg: "primary.200"}}
          width="75%"
          size="md"
          onPress={() => {
            Alert.alert("Health Profile Created!");
          }}
        >
          Create
        </Button>
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

export default CreateHealthProfile;
