import React, {useEffect} from "react";
import {Box, Heading} from "native-base";
import {UserContextProvider, useUser} from "../components/userContextProvider";

const SplashScreen = ({navigation}) => {
  const {user} = useUser();
  useEffect(() => {
    if (user) {
      navigation.navigate("MainScreen");
    } else {
      navigation.navigate("Login");
    }
  }, []);
  return (
    <Box
      flex={1}
      justifyContent="center"
      alignItems="center"
      bgColor="primary.300"
      safeArea
    >
      <Heading size="2xl" color="white">
        kiLocal
      </Heading>
    </Box>
  );
};

export default SplashScreen;
