import {useEffect} from "react";
import React from "react";
import {CreateHealthProfile, HomeScreen, ConfirmStatsScreen} from "../screens";
import {useUser} from "../components/userContextProvider";
import {Spinner} from "native-base";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const Redirector = () => {
  const {healthProfile} = useUser();
  return healthProfile ? (
    <HomeScreen />
  ) : (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="CreateHealthProfile"
        component={CreateHealthProfile}
      />
      <Stack.Screen
        options={{headerShown: false, presentation: "modal"}}
        name="ConfirmStatsScreen"
        component={ConfirmStatsScreen}
      />
    </Stack.Navigator>
  );
};

export default function MainScreen() {
  const {isLoading} = useUser();

  if (isLoading) return <Spinner color={"primary.100"} size="lg" />;
  return <Redirector />;
}
