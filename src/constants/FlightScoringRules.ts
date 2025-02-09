const arrivalDelayRules: Time_Delay_Rule[] = [
  {
    enabled: true,
    score: 70,
    difference: 6,
    description: 'Arrival delay is less than 6 hours.'
  },
  {
    enabled: true,
    score: 50,
    difference: 12,
    description: 'Arrival delay is less than 12 hours.'
  },
  {
    enabled: true,
    score: 40,
    difference: 24,
    description: 'Arrival delay is less than 24 hours.'
  },
  {
    enabled: true,
    score: 30,
    difference: 48,
    description: 'Arrival delay is less than 48 hours.'
  }
];

const cityPairRules: General_Rule[] = [
  {
    enabled: true,
    score: 40,
    title: 'Same city pair'
  },
  {
    enabled: true,
    score: 30,
    title: 'Different city pair but the same city'
  },
  {
    enabled: true,
    score: 20,
    title: 'Different cities'
  }
];

const stdRules: Time_Delay_Rule[] = [
  {
    enabled: true,
    score: 70,
    difference: 6,
    description: 'SPF is less than 6 hours.'
  },
  {
    enabled: true,
    score: 50,
    difference: 12,
    description: 'SPF is less than 12 hours.'
  },
  {
    enabled: true,
    score: 40,
    difference: 24,
    description: 'SPF is less than 24 hours.'
  },
  {
    enabled: true,
    score: 30,
    difference: 48,
    description: 'SPF is less than 48 hours.'
  }
];

export const initialFlightScoringRules: FlightScoringRules = {
  arrivalDelay: arrivalDelayRules,
  cityPair: cityPairRules,
  std: stdRules,
  general: [
    {
      enabled: true,
      title: 'Stopover',
      score: -20,
      description: 'If the flight has a stopover, then this score will be deducted.'
    },
    {
      title: 'Same Equipement',
      enabled: true,
      score: 50,
      description: 'Is the flight operated by the same equipment?'
    }
  ]
};
