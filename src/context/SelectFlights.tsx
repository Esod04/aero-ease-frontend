import { createContext, useContext } from 'react';
import { useImmer, Updater } from 'use-immer';

type SelectFlightsContextType = {
  selectedFlights: string[];
  setSelectedFlights: Updater<string[]>;
};

type SelectFlightsProviderProps = {
  children: React.ReactNode;
};

export const SelectFlightsContext = createContext<null | SelectFlightsContextType>(null);

export const SelectFlightsContextProvider = ({ children }: SelectFlightsProviderProps) => {
  const [selectedFlights, setSelectedFlights] = useImmer<string[]>([]);

  return (
    <SelectFlightsContext.Provider
      value={{
        selectedFlights,
        setSelectedFlights
      }}
    >
      {children}
    </SelectFlightsContext.Provider>
  );
};

export const useSelectFlights = () => {
  const context = useContext(SelectFlightsContext);
  if (!context) throw new Error('SelectFlights must be used within a SelectFlightsProvider.');

  return context;
};
