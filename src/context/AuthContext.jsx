import { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    await new Promise((res) => setTimeout(res, 500));

    const mockUsers = [
      { email: "user@example.com", password: "123456", username: "John Doe", role: "user" },
      { email: "admin@example.com", password: "admin123", username: "Admin", role: "admin" },
    ];

    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error("Invalid email or password");
    }

    setUser(foundUser);
    return foundUser;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Add this custom hook
export const useAuth = () => useContext(AuthContext);
