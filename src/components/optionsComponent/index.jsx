import React from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Avatar,
  Flex,
  Divider,
  Center,
  Pressable,
  Icon,
  Button,
} from "native-base";
import {useUser} from "../userContextProvider";
import {AntDesign} from "@expo/vector-icons";

const OptionsScreen = (props) => {
  const user = useUser();
  const {handleSignOut} = props;
  return (
    <Box flex={1} justifyContent="start" bgColor="primary.300" safeArea>
      <VStack width="100%" mt={20} px={5}>
        <Avatar
          bg="primary.400"
          source={{
            uri: "https://avatars.githubusercontent.com/u/28593720?v=4",
          }}
          size="2xl"
        >
          AP
        </Avatar>
        <Heading
          size="xl"
          style={{color: "white"}}
          fontWeight={700}
          mb={0}
          mt={3}
        >
          {user?.user?.user_metadata.firstName}{" "}
          {user?.user?.user_metadata.lastName}
          {/* Should have full name here */}
        </Heading>
        <Heading size="sm" color="primary.200" mb={2}>
          {user?.user?.email}
        </Heading>
        <Divider
          my="2"
          _light={{
            bg: "primary.200",
          }}
        />
        <Heading size="2xl" color="white">
          Stats at the start
        </Heading>
        <Flex flexDirection="row">
          <Box mr={5} mb={2}>
            <Heading size="lg" color="primary.200">
              {user?.healthProfile?.height} cm
            </Heading>
            <Heading size="md" color="white">
              Height
            </Heading>
          </Box>
          <Box mr={5} mb={2}>
            <Heading size="lg" color="primary.200">
              {user?.healthProfile?.weight} kg
            </Heading>
            <Heading size="md" color="white">
              Weight
            </Heading>
          </Box>
          <Box mr={5} mb={2}>
            <Heading size="lg" color="primary.200">
              {user?.healthProfile?.goalWeight} kg
            </Heading>
            <Heading size="md" color="white">
              Goal
            </Heading>
          </Box>
        </Flex>
        <Divider
          my="2"
          _light={{
            bg: "primary.200",
          }}
        />
        <Heading mt={3} size="lg" color="white">
          Physical Activity/Lifestyle
        </Heading>
        <Heading mt={0} size="2xl" color="primary.200" mb={2}>
          {user?.healthProfile?.physicalActivity}
        </Heading>

        <Button
          leftIcon={<Icon name="logout" as={AntDesign} color="white" />}
          onPress={handleSignOut}
          colorScheme="warning"
          mt={20}
        >
          Log Out
        </Button>
      </VStack>
    </Box>
  );
};

export default OptionsScreen;
