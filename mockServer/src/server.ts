import express, {Request, Response} from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Path to the data.json file
const dataFilePath = path.join(__dirname, 'data.json');

// Path to the countries.json file
const countriesFilePath = path.join(__dirname, 'countries.json');

// Helper function to load data from the data.json file
function loadData(): any[] {
  try {
    const rawData = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Error reading data file:', error);
    return [];
  }
}

// Helper function to load data from the countries.json file
function loadCountries(): any[] {
  try {
    const rawData = fs.readFileSync(countriesFilePath, 'utf8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Error reading countries file:', error);
    return [];
  }
}

// GET request to return the data from data.json
app.get('/api/data', (req: Request, res: Response) => {
  const data = loadData();
  res.json(data);
});

// GET request to return the data from countries.json
app.get('/api/countries', (req: Request, res: Response) => {
  const countries = loadCountries();
  res.json(countries);
});

app.get('/api/countries/:id', (req: Request, res: Response) => {
  const countries = loadCountries();
  const countryId = Number(req.params.id);
  res.json(countries[countryId]);
});


// Start the server
app.listen(port, () => {
  console.log(`Mock server running on http://localhost:${port}`);
});
