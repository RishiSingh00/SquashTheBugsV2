import React, { createContext, useContext, useState } from 'react';

// Step 1: Create a context
const GlobalStateContext = createContext();

// Step 2: Create a provider component
export const GlobalStateProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    username: '', // Initialize with default values
    contestId: '',
    mobilenum: '',
    language:'',
  });

  return (
    <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Step 3: Custom hook to access and update the global state
export const useGlobalState = () => useContext(GlobalStateContext);
