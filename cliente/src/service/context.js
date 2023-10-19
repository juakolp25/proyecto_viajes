import { createContext, useState } from "react";

const Context = createContext({});

export const MyProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <Context.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </Context.Provider>
  );
};

export default Context;