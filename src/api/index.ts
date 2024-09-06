import axios, {AxiosResponse} from 'axios';

const BASE_URL: string = 'https://world-demographics.p.rapidapi.com';
const apiKey: string | undefined = process.env.REACT_APP_API_KEY;

export interface TCountry {
  'locID': number,
  'location': string,
  'iso2Code': string,
  'iso3Code': string
}

interface TCountryData {
  locID: number;
  notes: string;
  iso3Code: string;
  iso2Code: string;
  sdmxCode: number;
  locTypeID: number;
  locTypeName: string;
  parentID: number;
  location: string;
  varID: number;
  variant: string;
  time: number;
  popDensity: number;
  popSexRatio: number;
  medianAgePop: number;
  natChange: number;
  natChangeRT: number;
  popChange: number;
  popGrowthRate: number;
  doublingTime: number | null;
  births: number;
  births1519: number;
  cbr: number;
  tfr: number;
  nrr: number;
  mac: number;
  srb: number;
  deaths: number;
  deathsMale: number;
  deathsFemale: number;
  cdr: number;
  lEx: number;
  lExMale: number;
  lExFemale: number;
  le15: number;
  le15Male: number;
  le15Female: number;
  le65: number;
  le65Male: number;
  le65Female: number;
  le80: number;
  le80Male: number;
  le80Female: number;
  infantDeaths: number;
  imr: number;
  lbSurvivingAge1: number;
  under5Deaths: number;
  q5: number;
  q0040: number;
  q0040Male: number;
  q0040Female: number;
  q0060: number;
  q0060Male: number;
  q0060Female: number;
  q1550: number;
  q1550Male: number;
  q1550Female: number;
  q1560: number;
  q1560Male: number;
  q1560Female: number;
  netMigrations: number;
  cnmr: number;
  tpopulation1Jan: number;
  tpopulation1July: number;
  tpopulationMale1July: number;
  tpopulationFemale1July: number;


}

export async function getCountryList() {

  const url: string = `${BASE_URL}/countries`;
  const res: AxiosResponse<Array<TCountry>> = await axios.get(url, {
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'world-demographics.p.rapidapi.com'
    }
  })
  return res.data;
}

export async function getCountryData(countryId: number) {
  const url: string = `${BASE_URL}/countries/${countryId}`;
  const res: AxiosResponse<TCountryData> = await axios.get(url,
      {
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': 'world-demographics.p.rapidapi.com'
        }
        //TODO: fix any
      }).catch((error: any) => {
    console.error('Error:', error.message);
    return {data: {} as TCountryData} as AxiosResponse<TCountryData>;
  });
  const currentYear = new Date().getFullYear();
  const targetYear = currentYear - 2;
  //TODO: find better solution
  // const actualData = res.data.find((item: TCountryData) => item.time === targetYear)
  const actualData = Array.isArray(res.data) ? res.data.find((item: TCountryData) => item.time === targetYear) : null;

  return actualData;
}