import React, { createContext, useState } from "react";

export const InventoryContext = createContext(null);

const InventoryProvider = ({ children }) => {
  const [isChangedValue, setIsChangedValue] = useState(false);

  return (
    <InventoryContext.Provider
      value={{
        isChangedValue,
        setIsChangedValue,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;
