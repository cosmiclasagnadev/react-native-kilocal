import React from "react";

export const UserContext = React.createContext({
  user: null,
  session: null,
});

export const UserContextProvider = (props) => {
  const [session, setSession] = React.useState(null);
  const [user, setUser] = React.useState(null);

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
      authListener.unsubscribe();
    };
  }, []);

  const value = {
    session,
    user,
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
