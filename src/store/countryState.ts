import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TDemographicData {
  births: number;
  births1519: number;
  cbr: number; // Crude Birth Rate
  cdr: number; // Crude Death Rate
  cnmr: number; // Crude Natural Migration Rate
  deaths: number;
  deathsFemale: number;
  deathsMale: number;
  doublingTime: number | null;
  imr: number; // Infant Mortality Rate
  infantDeaths: number;
  iso2Code: string;
  iso3Code: string;
  lEx: number; // Life Expectancy
  lExFemale: number;
  lExMale: number;
  lbSurvivingAge1: number; // Live births surviving to age 1
  le15: number; // Life expectancy at age 15
  le15Female: number;
  le15Male: number;
  le65: number; // Life expectancy at age 65
  le65Female: number;
  le65Male: number;
  le80: number; // Life expectancy at age 80
  le80Female: number;
  le80Male: number;
  locID: number;
  locTypeID: number;
  locTypeName: string;
  location: string;
  mac: number; // Mean Age of Childbearing
  medianAgePop: number;
  natChange: number; // Natural change
  natChangeRT: number; // Natural change rate
  netMigrations: number;
  notes: string;
  nrr: number; // Net Reproduction Rate
  parentID: number;
  popChange: number; // Population change
  popDensity: number;
  popGrowthRate: number;
  popSexRatio: number;
  q5: number; // Probability of dying between birth and age 5
  q0040: number; // Probability of dying between birth and age 40
  q0040Female: number;
  q0040Male: number;
  q0060: number; // Probability of dying between birth and age 60
  q0060Female: number;
  q0060Male: number;
  q1550: number; // Probability of dying between age 15 and 50
  q1550Female: number;
  q1550Male: number;
  q1560: number; // Probability of dying between age 15 and 60
  q1560Female: number;
  q1560Male: number;
  sdmxCode: number;
  srb: number; // Sex Ratio at Birth
  tfr: number; // Total Fertility Rate
  time: number;
  tpopulation1Jan: number; // Total population on January 1
  tpopulation1July: number; // Total population on July 1
  tpopulationFemale1July: number;
  tpopulationMale1July: number;
  under5Deaths: number;
  varID: number;
  variant: string;
}

const initialState: TDemographicData = {
  births: 0,
  births1519: 0,
  cbr: 0,
  cdr: 0,
  cnmr: 0,
  deaths: 0,
  deathsFemale: 0,
  deathsMale: 0,
  doublingTime: null,
  imr: 0,
  infantDeaths: 0,
  iso2Code: "",
  iso3Code: "",
  lEx: 0,
  lExFemale: 0,
  lExMale: 0,
  lbSurvivingAge1: 0,
  le15: 0,
  le15Female: 0,
  le15Male: 0,
  le65: 0,
  le65Female: 0,
  le65Male: 0,
  le80: 0,
  le80Female: 0,
  le80Male: 0,
  locID: 0,
  locTypeID: 0,
  locTypeName: "",
  location: "",
  mac: 0,
  medianAgePop: 0,
  natChange: 0,
  natChangeRT: 0,
  netMigrations: 0,
  notes: "",
  nrr: 0,
  parentID: 0,
  popChange: 0,
  popDensity: 0,
  popGrowthRate: 0,
  popSexRatio: 0,
  q5: 0,
  q0040: 0,
  q0040Female: 0,
  q0040Male: 0,
  q0060: 0,
  q0060Female: 0,
  q0060Male: 0,
  q1550: 0,
  q1550Female: 0,
  q1550Male: 0,
  q1560: 0,
  q1560Female: 0,
  q1560Male: 0,
  sdmxCode: 0,
  srb: 0,
  tfr: 0,
  time: 0,
  tpopulation1Jan: 0,
  tpopulation1July: 0,
  tpopulationFemale1July: 0,
  tpopulationMale1July: 0,
  under5Deaths: 0,
  varID: 0,
  variant: "",
};

// Create the user slice
export const userSlice = createSlice({
  name: "country",
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
