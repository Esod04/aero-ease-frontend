import { createContext, useContext } from 'react';
import { useImmer, Updater } from 'use-immer';

import { initialFlightScoringRules } from '../constants/FlightScoringRules';

type FlightRankingRulesContextType = {
  flightRankingRules: FlightScoringRules;
  setFlightRankingRules: Updater<FlightScoringRules>;
};

type FlightRankingRulesProviderProps = {
  children: React.ReactNode;
};

export const FlightRankingRulesContext = createContext<null | FlightRankingRulesContextType>(null);

export const FlightRankingRulesContextProvider = ({
  children
}: FlightRankingRulesProviderProps) => {
  const [flightRankingRules, setFlightRankingRules] =
    useImmer<FlightScoringRules>(initialFlightScoringRules);

  return (
    <FlightRankingRulesContext.Provider value={{ flightRankingRules, setFlightRankingRules }}>
      {children}
    </FlightRankingRulesContext.Provider>
  );
};

export const useFlightRankingRules = () => {
  const context = useContext(FlightRankingRulesContext);
  if (!context)
    throw new Error('FlightRankingRules must be used within a FlightRankingRulesProvider.');

  return context;
};
