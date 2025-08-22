// Student form types and interfaces
export interface StudentFormData {
  firstName: string;
  lastName: string;
  age: string;
  country: string;
  stateCity: string;
  institution: string;
  streetName: string;
  zipCode: string;
}

export const countries: string[] = [
  'Bangladesh',
  'Bahrain',
  'United States',
  'United Kingdom',
  'Ireland',
  'Canada',
  'Malta',
  'Belize',
  'France',
  'Canada (especially Quebec)',
  'Belgium',
  'Switzerland',
  'Luxembourg',
  'Monaco',
  'Haiti',
  'Germany',
  'Austria',
  'Liechtenstein',
];

export const cities: string[] = [
  // United States
  'New York',
  'Los Angeles',
  'Chicago',
  'Houston',
  'San Francisco',
  'Miami',
  // United Kingdom
  'London',
  'Birmingham',
  'Manchester',
  'Edinburgh',
  'Glasgow',
  // Ireland
  'Dublin',
  'Cork',
  'Galway',
  'Limerick',
  // Canada
  'Toronto',
  'Vancouver',
  'Montreal',
  'Calgary',
  'Ottawa',
  // Malta
  'Valletta',
  'Sliema',
  "St. Julian's",
  'Birgu',
  // Belize
  'Belmopan',
  'Belize City',
  'San Ignacio',
  'Orange Walk Town',
  // France
  'Paris',
  'Lyon',
  'Marseille',
  'Nice',
  'Toulouse',
  // Belgium
  'Brussels',
  'Antwerp',
  'Ghent',
  'Bruges',
  // Switzerland
  'Zurich',
  'Geneva',
  'Bern',
  'Basel',
  // Luxembourg
  'Luxembourg City',
  'Esch-sur-Alzette',
  'Differdange',
  'Dudelange',
  // Monaco
  'Monaco City',
  'Monte Carlo',
  // Haiti
  'Port-au-Prince',
  'Cap-Haïtien',
  'Gonaïves',
  'Les Cayes',
  // Germany
  'Berlin',
  'Munich',
  'Hamburg',
  'Frankfurt',
  'Cologne',
  // Austria
  'Vienna',
  'Salzburg',
  'Innsbruck',
  'Graz',
  // Liechtenstein
  'Vaduz',
  'Schaan',
  'Balzers',
  'Triesen',
];
