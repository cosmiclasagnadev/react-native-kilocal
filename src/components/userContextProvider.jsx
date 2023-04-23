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
  const [refreshFromCreateProfileScreen, setRefresh] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [healthStatsToday, setHealthStatsToday] = React.useState(null);

  useEffect(() => {
    setIsLoading(true);
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    const {data} = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const fetchHealthProfile = async () => {
      setIsLoading(true);
      const {id} = session?.user;
      console.log(session);
      const {data, error} = await supabase
        .from("healthProfiles")
        .select()
        .eq(`user_id`, id);

      if (error) {
        Alert.alert(error.message);
      }
      if (data.length > 0) {
        setHealthProfile(data[0]);
      } else {
        setHealthProfile(null);
      }
      setIsLoading(false);
    };

    fetchHealthProfile();
  }, [session, refreshFromCreateProfileScreen]);

  const handleSignOut = async () => {
    const {error} = await supabase.auth.signOut();
    if (error) Alert.alert(error.message);
    setRefresh(false);
  };

  const value = {
    session,
    user,
    healthProfile,
    setRefresh,
    isLoading,
    healthStatsToday,
    setHealthStatsToday,
    handleSignOut,
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
