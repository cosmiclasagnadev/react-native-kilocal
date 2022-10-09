import {useEffect} from "react";

import React from "react";
import {CreateHealthProfile, HomeScreen} from "../screens";
import {useUser} from "../components/userContextProvider";

const Redirector = () => {
  const {healthProfile} = useUser();
  console.log("HEALTH PROFILE: ", healthProfile);
  return healthProfile ? <HomeScreen /> : <CreateHealthProfile />;
};

export default function MainScreen() {
  return <Redirector />;
}
