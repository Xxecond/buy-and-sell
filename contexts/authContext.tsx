"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { User } from "@/lib/type";

import {
  loginUser,
  signupUser,
  logoutUser,
  getCurrentUser,
  SignupResponse,
} from "@/lib/auth";

type AuthContextType = {
  user: User | null;

  loading: boolean;

  login: (email: string, password: string) => Promise<void>;

  signup: (name: string, email: string, password: string) => Promise<SignupResponse>;

  logout: () => Promise<void>;
};

const STORAGE_KEY = "shoply-auth-user";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const readStoredUser = (): User | null => {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
};

const persistUser = (user: User | null) => {
  if (typeof window === "undefined") return;

  if (user) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } else {
    window.localStorage.removeItem(STORAGE_KEY);
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => readStoredUser());

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser();

        if (currentUser) {
          persistUser(currentUser);
          setUser(currentUser);
        } else {
          const storedUser = readStoredUser();
          if (storedUser) {
            setUser(storedUser);
          } else {
            setUser(null);
          }
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "";
        console.error("Failed to restore auth session", message);

        persistUser(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      const authenticatedUser = data.user ?? (await getCurrentUser());

      if (authenticatedUser) {
        persistUser(authenticatedUser);
        setUser(authenticatedUser);
      } else {
        persistUser(null);
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);

    try {
      const data = await signupUser(name, email, password);

      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await logoutUser();

    persistUser(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,

        loading,

        login,

        signup,

        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
