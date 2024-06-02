
const { Client } = require('@googlemaps/google-maps-services-js');

const client = new Client({});

const API_KEY = 'AIzaSyBrFrB2yYfpdcNkq2ZdBUb--XkoLNgjjrg';



class AutocompleteController{
    async index(req,res){

        const {input} = req.body;

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
        
    }
}

export default new AutocompleteController();