import {useEffect} from "react";

import {Alert} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {supabase} from "../supabase/initSupabase";
import React from "react";
import {CreateHealthProfile, HomeScreen} from "../screens";

const Stack = createNativeStackNavigator();

export default function MainScreen({navigation}) {
  const checkForHealthProfile = async () => {
    // check if current authenticated user has an entry in healthProfile table
    const {id} = supabase.auth.user();
    const {data, error} = await supabase
      .from("healthProfiles")
      .select()
      .eq(`user_id`, id);
    if (error) {
      console.log("Error: ", error.message);
      Alert.alert(error.message);
    }
    if (data.length === 0) {
      console.log("No health profile");
      navigation.navigate("CreateHealthProfile");
    } else {
      console.log("Health profile exists");
      navigation.navigate("HomeScreen");
    }
  };

  useEffect(() => {
    checkForHealthProfile();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="CreateHealthProfile"
          component={CreateHealthProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
