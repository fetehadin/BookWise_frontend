import { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Load user from localStorage for persistence
    const saved = localStorage.getItem("demoUser");
    return saved ? JSON.parse(saved) : null;
  });

  // Demo credentials
  const mockUsers = [
    { email: "AlazarWondifraw@gmail.com", password: "123456", username: "Alazar", role: "admin" },
    { email: "FetehadinNegash@gmail.com", password: "123456", username: "fetehadin", role: "user" },
  ];

  const login = async (email, password) => {
    // Simulate network delay
    await new Promise((res) => setTimeout(res, 300));

    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error("Invalid email or password");
    }

    setUser(foundUser);
    localStorage.setItem("demoUser", JSON.stringify(foundUser)); // persist
    return foundUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("demoUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for convenience
export const useAuth = () => useContext(AuthContext);
