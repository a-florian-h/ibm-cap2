import React, { createContext, useState, useContext } from 'react';

// Create a context object
const AppointmentsContext = createContext();

// Create a provider component
export const AppointmentsProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  return (
    <AppointmentsContext.Provider value={{ appointments, setAppointments }}>
      {children}
    </AppointmentsContext.Provider>
  );
};

// Create a custom hook to use the appointments context
export const useAppointments = () => {
  const context = useContext(AppointmentsContext);
  if (context === undefined) {
    throw new Error('useAppointments must be used within an AppointmentsProvider');
  }
  return context;
};