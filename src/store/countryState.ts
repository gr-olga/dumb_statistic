import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface TDemographicData {
  locationId: number;                            // locID: A unique identifier for the location
  locationName: string;                          // location: The name of the location
  iso2Code: string;                              // iso2Code: ISO 3166-1 alpha-2 code
  iso3Code: string;                              // iso3Code: ISO 3166-1 alpha-3 code
  sdmxCode: number;                              // sdmxCode: SDMX code for the location
  locationTypeId: number;                        // locTypeID: The ID indicating the type of location
  locationTypeName: string;                      // locTypeName: The name of the location type
  parentLocationId: number;                      // parentID: The ID of the parent location, if applicable
  variantId: number;                             // varID: The ID indicating the demographic variant
  variantName: string;                           // variant: The name of the demographic variant
  year: number;                                  // time: The specific year for the data

  populationDensity: number;                     // popDensity: People per square kilometer as of 1 July
  populationSexRatio: number;                    // popSexRatio: Sex ratio (males per 100 females) as of 1 July
  medianAge: number;                             // medianAgePop: Median age of the population as of 1 July
  naturalPopulationChange: number;               // natChange: Natural change in population (births minus deaths) in thousands
  naturalPopulationChangeRate: number;           // natChangeRT: Rate of natural change per 1,000 people
  totalPopulationChange: number;                 // popChange: Overall population change in thousands
  populationGrowthRate: number;                  // popGrowthRate: Population growth rate as a percentage
  populationDoublingTime: number | null;         // doublingTime: Years for population to double at current rate

  totalBirths: number;                           // births: Total number of live births in thousands
  birthsByWomenAged15To19: number;               // births1519: Number of live births to women aged 15-19 in thousands
  crudeBirthRate: number;                        // cbr: Crude birth rate per 1,000 population
  totalFertilityRate: number;                    // tfr: Total fertility rate (average number of live births per woman)
  netReproductionRate: number;                   // nrr: Net reproduction rate (surviving daughters per woman)
  meanAgeAtChildbearing: number;                 // mac: Mean age at childbearing in years
  sexRatioAtBirth: number;                       // srb: Sex ratio at birth (males per 100 females)

  totalDeaths: number;                           // deaths: Total number of deaths in thousands
  maleDeaths: number;                            // deathsMale: Total male deaths in thousands
  femaleDeaths: number;                          // deathsFemale: Total female deaths in thousands
  crudeDeathRate: number;                        // cdr: Crude death rate per 1,000 population

  lifeExpectancyAtBirth: number;                 // lEx: Life expectancy at birth for both sexes in years
  maleLifeExpectancyAtBirth: number;             // lExMale: Life expectancy at birth for males in years
  femaleLifeExpectancyAtBirth: number;           // lExFemale: Life expectancy at birth for females in years
  lifeExpectancyAtAge15: number;                 // le15: Life expectancy at age 15 for both sexes in years
  maleLifeExpectancyAtAge15: number;             // le15Male: Life expectancy at age 15 for males in years
  femaleLifeExpectancyAtAge15: number;           // le15Female: Life expectancy at age 15 for females in years
  lifeExpectancyAtAge65: number;                 // le65: Life expectancy at age 65 for both sexes in years
  maleLifeExpectancyAtAge65: number;             // le65Male: Life expectancy at age 65 for males in years
  femaleLifeExpectancyAtAge65: number;           // le65Female: Life expectancy at age 65 for females in years
  lifeExpectancyAtAge80: number;                 // le80: Life expectancy at age 80 for both sexes in years
  maleLifeExpectancyAtAge80: number;             // le80Male: Life expectancy at age 80 for males in years
  femaleLifeExpectancyAtAge80: number;           // le80Female: Life expectancy at age 80 for females in years

  infantDeathsUnderAge1: number;                 // infantDeaths: Total infant deaths (under age 1) in thousands
  infantMortalityRate: number;                   // imr: Infant mortality rate (deaths per 1,000 live births)
  liveBirthsSurvivingToAge1: number;             // lbSurvivingAge1: Live births surviving to age 1 in thousands
  deathsUnderAge5: number;                       // under5Deaths: Deaths under age 5 in thousands
  underFiveMortalityRate: number;                // q5: Under-five mortality rate (deaths per 1,000 live births)

  mortalityBeforeAge40: number;                  // q0040: Mortality rate before age 40 for both sexes (deaths per 1,000 live births)
  maleMortalityBeforeAge40: number;              // q0040Male: Male mortality rate before age 40 (deaths per 1,000 live births)
  femaleMortalityBeforeAge40: number;            // q0040Female: Female mortality rate before age 40 (deaths per 1,000 live births)

  mortalityBetween15And60: number;               // q0060: Mortality rate between age 15 and 60 for both sexes (deaths per 1,000 alive at age 15)
  maleMortalityBetween15And60: number;           // q0060Male: Male mortality rate between age 15 and 60 (deaths per 1,000 alive at age 15)
  femaleMortalityBetween15And60: number;         // q0060Female: Female mortality rate between age 15 and 60 (deaths per 1,000 alive at age 15)

  mortalityBetween15And50: number;               // q1550: Mortality rate between age 15 and 50 for both sexes (deaths per 1,000 alive at age 15)
  maleMortalityBetween15And50: number;           // q1550Male: Male mortality rate between age 15 and 50 (deaths per 1,000 alive at age 15)
  femaleMortalityBetween15And50: number;         // q1550Female: Female mortality rate between age 15 and 50 (deaths per 1,000 alive at age 15)

  mortalityBetween15And60Detailed: number;       // q1560: Mort
}

const initialState: TDemographicData = {
  locationId: 0,
  locationName: '',
  iso2Code: '',
  iso3Code: '',
  sdmxCode: 0,
  locationTypeId: 0,
  locationTypeName: '',
  parentLocationId: 0,
  variantId: 0,
  variantName: '',
  year: 0,
  populationDensity: 0,
  populationSexRatio: 0,
  medianAge: 0,
  naturalPopulationChange: 0,
  naturalPopulationChangeRate: 0,
  totalPopulationChange: 0,
  populationGrowthRate: 0,
  populationDoublingTime: null,
  totalBirths: 0,
  birthsByWomenAged15To19: 0,
  crudeBirthRate: 0,
  totalFertilityRate: 0,
  netReproductionRate: 0,
  meanAgeAtChildbearing: 0,
  sexRatioAtBirth: 0,
  totalDeaths: 0,
  maleDeaths: 0,
  femaleDeaths: 0,
  crudeDeathRate: 0,
  lifeExpectancyAtBirth: 0,
  maleLifeExpectancyAtBirth: 0,
  femaleLifeExpectancyAtBirth: 0,
  lifeExpectancyAtAge15: 0,
  maleLifeExpectancyAtAge15: 0,
  femaleLifeExpectancyAtAge15: 0,
  lifeExpectancyAtAge65: 0,
  maleLifeExpectancyAtAge65: 0,
  femaleLifeExpectancyAtAge65: 0,
  lifeExpectancyAtAge80: 0,
  maleLifeExpectancyAtAge80: 0,
  femaleLifeExpectancyAtAge80: 0,
  infantDeathsUnderAge1: 0,
  infantMortalityRate: 0,
  liveBirthsSurvivingToAge1: 0,
  deathsUnderAge5: 0,
  underFiveMortalityRate: 0,
  mortalityBeforeAge40: 0,
  maleMortalityBeforeAge40: 0,
  femaleMortalityBeforeAge40: 0,
  mortalityBetween15And60: 0,
  maleMortalityBetween15And60: 0,
  femaleMortalityBetween15And60: 0,
  mortalityBetween15And50: 0,
  maleMortalityBetween15And50: 0,
  femaleMortalityBetween15And50: 0,
  mortalityBetween15And60Detailed: 0,
};

// Create the user slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCountryData(state, action: PayloadAction<TDemographicData>) {
      return { ...state, ...action.payload };
    },
    resetData(state) {
      return { ...initialState };
    },
  },
});

export const { setCountryData, resetData } = userSlice.actions;
export default userSlice.reducer;