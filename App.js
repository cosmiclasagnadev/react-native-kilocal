import {NativeBaseProvider} from "native-base";
import {NavigationContainer} from "@react-navigation/native";
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
    <NavigationContainer>
      <UserContextProvider>
        <NativeBaseProvider theme={theme}>
          <Container />
        </NativeBaseProvider>
      </UserContextProvider>
    </NavigationContainer>
  );
}
