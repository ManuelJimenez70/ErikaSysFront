import React, { createContext, useContext, useState } from 'react';

// Crea un contexto
const AuthContext = createContext();

// Proveedor de contexto
export function AuthProvider({ children }) {
  const [userId, setUserId] = useState(null);

  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para acceder al contexto
export function useAuth() {
  return useContext(AuthContext);

}

