const initialSSRRules: PNR_SSR_Rule[] = [
  {
    type: 'INFT',
    enabled: true,
    value: 200,
    description: 'Infant'
  },
  {
    type: 'WCHR',
    enabled: true,
    value: 200,
    description: 'Wheelchair, can walk'
  },
  {
    type: 'WCHS',
    enabled: true,
    value: 200,
    description: "Wheelchair, can't climb stairs"
  },
  {
    type: 'WCHC',
    enabled: true,
    value: 200,
    description: 'Complete immobile'
  },
  {
    type: 'LANG',
    enabled: true,
    value: 200,
    description: 'Language restrictions'
  },
  {
    type: 'CHLD',
    enabled: true,
    value: 200,
    description: 'Child'
  },
  {
    type: 'MAAS',
    enabled: true,
    value: 200,
    description: 'Meet and assist - many reasons'
  },
  {
    type: 'UNMR',
    enabled: true,
    value: 200,
    description: 'Unaccompanied minor'
  },
  {
    type: 'BLND',
    enabled: true,
    value: 200,
    description: 'Blind'
  },
  {
    type: 'DEAF',
    enabled: true,
    value: 200,
    description: 'Deaf'
  },
  {
    type: 'EXST',
    enabled: true,
    value: 200,
    description: 'Large person taking up two seats'
  },
  {
    type: 'MEAL',
    enabled: true,
    value: 200,
    description: 'Meal request'
  },
  {
    type: 'NSST',
    enabled: true,
    value: 200,
    description: 'Seat information'
  },
  {
    type: 'NRPS',
    enabled: true,
    value: 200
  }
];

const initialClassRules: PNR_Class_Rule[] = [
  {
    class: 'FirstClass',
    enabled: true,
    value: 800
  },
  {
    class: 'BusinessClass',
    enabled: true,
    value: 800
  },
  {
    class: 'PremiumEconomyClass',
    enabled: true,
    value: 800
  },
  {
    class: 'EconomyClass',
    enabled: true,
    value: 800
  }
];

const initalOtherRules: PNR_Other_Rule[] = [
  {
    title: 'Connection',
    description:
      "If the flight is a connection, the priority is incremented by the 'value' times the number of downline connections.",
    enabled: true,
    value: 100
  },
  {
    title: 'Paid Service',
    description: 'If the flight is a paid service, the priority is incremented by the value.',
    enabled: true,
    value: 200
  },
  {
    title: 'Group Booking',
    enabled: true,
    value: 500
  },
  {
    title: 'Loyality',
    enabled: true,
    value: 1700,
    description:
      "If the passenger is a loyality member, the priority is incremented by the 'value'."
  },
  {
    title: 'Number of Passengers',
    enabled: true,
    value: 50,
    description:
      "If the number of passengers is greater than 1, the priority is incremented by the 'value' times the number of passengers."
  }
];

export const initialPNRRules: PNRRankingRules = {
  ssr: initialSSRRules,
  class: initialClassRules,
  other: initalOtherRules
};
