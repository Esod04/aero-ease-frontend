import { useFlightRankingRules } from '../context/FlightRankingRules';
import { usePNRRankingRules } from '../context/PNRRankingRules';

export const useExportRules = () => {
  const { flightRankingRules } = useFlightRankingRules();
  const { pnrRankingRules } = usePNRRankingRules();
  return {
    flightRankingRules,
    pnrRankingRules
  };
};
