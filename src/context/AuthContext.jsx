import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import api from "../../api";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);

      if (u) {
        api.defaults.headers.common["x-user-id"] = u.uid;
        api.defaults.headers.common["x-user-email"] = u.email || "";
      } else {
        delete api.defaults.headers.common["x-user-id"];
        delete api.defaults.headers.common["x-user-email"];
      }

      setLoadingAuth(false);
    });

    return () => unsub();
  }, []);

  async function logoutUser() {
    await signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, loadingAuth, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
