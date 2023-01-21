import {useEffect} from "react";
import React from "react";
import {CreateHealthProfile, HomeScreen} from "../screens";
import {useUser} from "../components/userContextProvider";
import {Spinner} from "native-base";

const Redirector = () => {
  const {healthProfile} = useUser();
  return healthProfile ? <HomeScreen /> : <CreateHealthProfile />;
};

export default function MainScreen() {
  const {isLoading} = useUser();

  if (isLoading) return <Spinner color={"primary.100"} size="lg" />;
  return <Redirector />;
}
