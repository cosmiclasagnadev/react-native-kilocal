import {StatusBar} from "expo-status-bar";
import {StyleSheet, Text, View} from "react-native";
import {NativeBaseProvider} from "native-base";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import "react-native-url-polyfill/auto";

import {LoginScreen, RegisterScreen, MainScreen} from "./src/screens";
import {
  UserContextProvider,
  useUser,
} from "./src/components/userContextProvider";
import theme from "./theme";

const Container = () => {
  const {user} = useUser();
  return user ? <MainScreen /> : <LoginScreen />;
};

export default function App() {
  return (
    <UserContextProvider>
      <NativeBaseProvider theme={theme}>
        <Container />
      </NativeBaseProvider>
    </UserContextProvider>
  );
}
