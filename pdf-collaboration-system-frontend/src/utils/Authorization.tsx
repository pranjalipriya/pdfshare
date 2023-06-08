import React, { createContext, useState } from 'react';

interface AuthContextProps {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  setToken: () => {},
});

interface AuthProviderProps {
    children: React.ReactNode;
  }

export const AuthProvider:  React.FC<AuthProviderProps> = ({ children }: any) => {
  const [token, setToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
