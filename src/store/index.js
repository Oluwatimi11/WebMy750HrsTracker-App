import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

// Get the initial rental type from localStorage
const getInitialRentalType = () => {
  const storedState = localStorage.getItem('rentalType');
  return storedState ? JSON.parse(storedState) : 'str';
};

// Create a context Object
const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // Use the memoized initial rental type
  const initialRentalType = useMemo(() => getInitialRentalType(), []);

  const [rentalType, setRentalType] = useState(initialRentalType);

  useEffect(() => {
    localStorage.setItem('rentalType', JSON.stringify(rentalType));
  }, [rentalType]);

  const toggleRentalType = useCallback(
    (propertyType) => {
      // Avoid unnecessary state updates
      if (rentalType !== propertyType) {
        setRentalType(propertyType);
      }
    },
    [rentalType]
  );
  // Wrap components with a provider or create a provider for the context
  return (
    <StoreContext.Provider value={{ rentalType, toggleRentalType }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const contextValue = useContext(StoreContext);
  return {
    rentalType: contextValue?.rentalType || 'str', // Default rental type
    toggleRentalType: contextValue?.toggleRentalType || (() => { }), // Default empty function
  };
};