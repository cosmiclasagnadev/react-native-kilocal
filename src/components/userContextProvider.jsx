import React, {useEffect, useContext} from "react";
import {supabase} from "../supabase/initSupabase";

export const UserContext = React.createContext({
  user: null,
  session: null,
  healthProfile: null,
});

export const UserContextProvider = (props) => {
  const [session, setSession] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [healthProfile, setHealthProfile] = React.useState(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    const {data} = supabase.auth.onAuthStateChange((event, session) => {
      console.log(`Supabase auth event: ${event}`);
      setSession(session);
      setUser(session?.user ?? null);
    });
    return () => {
      data.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchHealthProfile = async () => {
      const {id} = session?.user;
      console.log("USER ID: ", id);
      const {data, error} = await supabase
        .from("healthProfiles")
        .select()
        .eq(`user_id`, id);

      if (error) {
        Alert.alert(error.message);
      }
      if (data.length > 0) {
        console.log("health profile exists");
        setHealthProfile(data[0]);
      } else {
        console.log("no health profile");
        setHealthProfile(null);
      }
    };

    fetchHealthProfile();
  }, [session]);

  const value = {
    session,
    user,
    healthProfile,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};
