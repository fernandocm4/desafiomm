//require("dotenv").config({ path: "./.env" })

/*const express = require('express');
const { Client } = require('@googlemaps/google-maps-services-js');

const app = express();
const port = 5000;

const client = new Client({});
const API_KEY = 'AIzaSyBrFrB2yYfpdcNkq2ZdBUb--XkoLNgjjrg'; // substitua com sua chave de API

app.use(express.static('public'));
app.use(express.json());

app.post('/autocomplete', async (req, res) => {
  const { input } = req.body;

  try {
    const response = await client.placeAutocomplete({
      params: {
        input,
        key: API_KEY,
        language: 'pt', // define o idioma para português
      },
    });

    res.json(response.data.predictions);
  } catch (error) {
    console.error('Error fetching autocomplete data:', error);
    res.status(500).send('Error fetching autocomplete data');
  }
});

app.post('/placedetails', async (req, res) => {
  const { place_id } = req.body;

  try {
    const response = await client.placeDetails({
      params: {
        place_id,
        key: API_KEY,
        language: 'pt', // define o idioma para português
      },
    });

    res.json(response.data.result);
  } catch (error) {
    console.error('Error fetching place details:', error);
    res.status(500).send('Error fetching place details');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



const origem = ori;
const destino = des;
client.directions({
    params: {
        origin: origem,
        destination: destino,
        key: API_KEY
    },
    timeout: 1000
}).then(response => {
    const route = response.data.routes[0];
    const leg = route.legs[0];
    console.log(`Distância: ${leg.distance.text}`);
    console.log(`Tempo de viagem: ${leg.duration.text}`);
}).catch(error => {
    console.error(error);
});*/






const express = require('express');
const { Client } = require('@googlemaps/google-maps-services-js');

const app = express();
const port = 5000;

const client = new Client({});
const API_KEY = 'AIzaSyBrFrB2yYfpdcNkq2ZdBUb--XkoLNgjjrg'; // substitua com sua chave de API

app.use(express.static('public'));
app.use(express.json());

app.post('/autocomplete', async (req, res) => {
  const { input } = req.body;

  try {
    const response = await client.placeAutocomplete({
      params: {
        input,
        key: API_KEY,
        language: 'pt', // define o idioma para português
        components: 'country:br', // restringe aos resultados do Brasil
      },
    });

    res.json(response.data.predictions);
  } catch (error) {
    console.error('Error fetching autocomplete data:', error);
    res.status(500).send('Error fetching autocomplete data');
  }
});

app.post('/placedetails', async (req, res) => {
  const { place_id } = req.body;

  try {
    const response = await client.placeDetails({
      params: {
        place_id,
        key: API_KEY,
        language: 'pt', // define o idioma para português
      },
    });

    res.json(response.data.result);
  } catch (error) {
    console.error('Error fetching place details:', error);
    res.status(500).send('Error fetching place details');
  }
});

app.post('/route', async (req, res) => {
  const { origin, destination, mode } = req.body;

  try {
    const response = await client.directions({
      params: {
        origin,
        destination,
        mode, // adiciona o modo de transporte
        key: API_KEY,
        language: 'pt', // define o idioma para português
      },
    });

    const route = response.data.routes[0];
    const leg = route.legs[0];

    const distance = leg.distance.text;
    const duration = leg.duration.text;

    res.json({ distance, duration });
  } catch (error) {
    console.error('Error fetching route data:', error);
    res.status(500).send('Error fetching route data');
  }
});

/*app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});*/
