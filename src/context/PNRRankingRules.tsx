import { createContext, useContext } from 'react';
import { useImmer, Updater } from 'use-immer';

import { initialPNRRules } from '../constants/PNRRules';

type PNRRankingRulesContextType = {
  pnrRankingRules: PNRRankingRules;
  setPNRRankingRules: Updater<PNRRankingRules>;
};

type PNRRankingRulesProviderProps = {
  children: React.ReactNode;
};

export const PNRRankingRulesContext = createContext<null | PNRRankingRulesContextType>(null);

export const PNRRankingRulesContextProvider = ({ children }: PNRRankingRulesProviderProps) => {
  const [pnrRankingRules, setPNRRankingRules] = useImmer<PNRRankingRules>(initialPNRRules);

  return (
    <PNRRankingRulesContext.Provider value={{ pnrRankingRules, setPNRRankingRules }}>
      {children}
    </PNRRankingRulesContext.Provider>
  );
};

export const usePNRRankingRules = () => {
  const context = useContext(PNRRankingRulesContext);
  if (!context) throw new Error('PNRRankingRules must be used within a PNRRankingRulesProvider.');

  return context;
};
