import "./App.css";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "./store/auth";
import { supabase } from "./supabase";
import AllRoutes from "./routes/all-routes";

function App() {
  const [, setUser] = useAtom(userAtom);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session);
      setIsloading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  if (isLoading) {
    return <div>loading</div>;
  }
  return <AllRoutes />;
}

export default App;
