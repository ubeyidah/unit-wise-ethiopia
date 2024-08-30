import { checkAuth } from "@/apis/auth/auth.api";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { toast } from "sonner";
export interface User {
  _id: string;
  userName: string;
  fullName: string;
  email: string;
  profileImage: string;
  studyType: "social" | "natural" | "";
  gender: "male" | "female" | "";
  school: string;
  followers: string[];
  following: string[];
  phoneNumber: string;
  paymentImage: string;
  status: string;
  isPaid: boolean;
  isBlock: boolean;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  __V?: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: boolean;
  login: (userData: User) => void;
  logout: () => void;
  reloadUser: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };
  const loadAuth = async () => {
    setLoading(true);
    try {
      const { user } = await checkAuth();
      login(user);
    } catch (error) {
      setError(true);
      toast.error("No internet connection");
    } finally {
      setLoading(false);
    }
  };
  const reloadUser = () => {
    loadAuth();
  };

  useEffect(() => {
    if (!user) {
      loadAuth();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, logout, reloadUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
