const express = require("express");
const axios = require('axios').default;
const { Client } = require("@googlemaps/google-maps-services-js");
require('dotenv').config()

const app = express();

app.get("/nearby/:lat/:lng/:page", (req, res) => {

    const client = new Client({});

    const lat = req.params.lat
    const lng = req.params.lng
    const page = req.params.page

    client
        .placesNearby({
            params: {
                // 37.40, -122.08
                location: { lat, lng },
                radius: 200,
                key: process.env.GOOGLE_MAPS_API_KEY,
                pageToken: page
            },
            timeout: 1000, // milliseconds
        })
        .then((r) => {
            const result = r.data.results
            return res.status(200).send(result);
        })
        .catch((e) => {
            return res.status(400).send(e);
        });
});


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});