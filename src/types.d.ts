type General_PNR_Rule = {
  enabled: boolean;
  value: number;
  description?: string;
};

type PNR_SSR_Rule = {
  type: string;
} & General_PNR_Rule;

type PNR_Cabin_Rule = {
  cabin: string;
} & General_PNR_Rule;

type PNR_Class_Rule = {
  class: string;
} & General_PNR_Rule;

type PNR_Other_Rule = {
  title: string;
} & General_PNR_Rule;

type PNRRankingRules = {
  ssr: PNR_SSR_Rule[];
  class: PNR_Class_Rule[];
  other: PNR_Other_Rule[];
};

type Time_Delay_Rule = {
  enabled: boolean;
  score: number;
  difference: number;
  description?: string;
};

type General_Rule = {
  enabled: boolean;
  score: number;
  title: string;
  description?: string;
};

type FlightScoringRules = {
  arrivalDelay: Time_Delay_Rule[];
  cityPair: General_Rule[];
  std: Time_Delay_Rule[];
  general: General_Rule[];
};
