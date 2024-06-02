import traveldb from "../models/Travel";

const axios = require('axios');
//import { forEach } from "core-js/core/array";

require("dotenv/config");


const { Client } = require("@googlemaps/google-maps-services-js");

const googleApiKey = process.env.API_KEY;

class TravelController {

    async addDestinations(req, res) {
        try {
            const { destino, position } = req.body;

            const { user_id } = req.params;
            //destino.timestemp = Date.now();

            //originsdb.findOne()

            traveldb.insert({ user_id, destino, position }, (err, newDoc) => {
                if (err) {
                    return
                }
                res.json(newDoc);
            })

        } catch (error) {

        }
    }



    async index(req, res) {
        try {
            const { user_id } = req.params;
            const { name, email } = req.body;

            traveldb.find({ user_id: user_id }).sort({ position: 1 }).exec((err, docs) => {
                if (err) {
                    return
                }

                res.json(docs);
            });


        } catch (error) {
            return res.status(500).json({ error: "deu outro bo" });
        }
    }



    async calculaDistancia(req, res) {


        try {
            const { user_id } = req.params;
            const { origin } = req.body;

            traveldb.find({ user_id: user_id }).sort({ position: 1 }).exec(async (err, docs) => {
                if (err) {
                    return res.status(500).json({ error: "deu bo" });
                }


                const destinations = docs.map(doc => doc.destino);
                if (destinations.length === 0) {
                    return res.json({ totalDistance: '0 km', totalDuration: '0 hours 0 minutes' });
                }

                let totalDistance = 0;
                let totalDuration = 0;
                let currentOrigin = origin;

                for (let i = 0; i < destinations.length; i++) {
                    const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json`, {
                        params: {
                            origin: currentOrigin,
                            destination: destinations[i],
                            key: googleApiKey
                        }
                    });
                    const data = response.data;
                    //return res.json(response.data);
                    if (data.status === 'OK') {
                        //return res.json(data.routes[0]);
                        const leg = data.routes[0].legs[0];
                        totalDistance += leg.distance.value;
                        totalDuration += leg.duration.value;
                        currentOrigin - destinations[i];
                    } else {
                        res.status(400).json({ error: 'Unable to calculate distances' });

                    }
                }

                res.json({
                    totalDistance: (totalDistance/1000).toFixed(2) + ' km',
                    totalDuration: Math.floor(totalDuration/3600)+'h'+Math.floor((totalDuration % 3600)/60)+'min'
                });

            });
        } catch (error) {
            return res.status(500).json({ error: "deu outro bo" });
        }
    }




    async show(req, res) {
        try {
            const { id } = req.params;
            traveldb.findOne({ _id: id }, (err, des) => {
                if (err) {
                    return res.status(500).json({ error: `No destinations with id ${id}` });
                }
                if (!des) {
                    return res.status(500).json({ error: `No destinations with id ${id}` });
                }
                return res.status(200).send(des);
            });
        } catch (error) {
            return res.status(500).json({ error: "Internal error" });
        }
    }


    async update(req, res) {
        try {
            const { user_id, id } = req.params;
            const { destino, position } = req.body;


            traveldb.update({ _id: id }, { $set: { destino, position } }, {}, (err, nplaced) => {
                if (err) {
                    res.json({ "message": "deu bo aki ó" });
                }
                traveldb.findOne({ _id: id }, (err, doc) => {
                    if (err) {
                        return;
                    }
                    res.json({ "message": "success" });
                })
            })

        } catch (error) {
            return res.status(500).json(error);
        }
    }


    async remove(req, res) {
        try {
            const { user_id, id } = req.params;

            traveldb.remove({ _id: id }, {}, (err, numRemo) => {
                if (err) {
                    return;
                }
                res.json({ "message": "success" });
            })

        } catch (error) {

        }
    }






    async removeAll(req, res) {
        try {
            const { user_id } = req.params;
            traveldb.remove({ user_id: user_id }, { multi: true }, (err, des) => {
                if (err) {
                    return res.status(500).json({ error: `Ocorreu algum erro interno` });
                }
                if (!des) {
                    return res.status(404).json({ error: `No data in db` });
                }
                return res.status(200).json();
            });
        } catch (error) {

        }
    }

}

export default new TravelController();