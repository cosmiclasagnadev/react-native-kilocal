import {StatusBar} from "expo-status-bar";
import {StyleSheet, Text, View} from "react-native";
import {NativeBaseProvider} from "native-base";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {LoginScreen, RegisterScreen, MainScreen} from "./src/screens";
import {
  UserContextProvider,
  useUser,
} from "./src/components/userContextProvider";
import theme from "./theme";

const Stack = createNativeStackNavigator();

const Container = () => {
  const {user} = useUser();
  return user ? <MainScreen /> : <LoginScreen />;
};

export default function App() {
  return (
    <UserContextProvider>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </UserContextProvider>
  );
}
