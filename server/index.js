const express = require("express");
const axios = require('axios').default;
const { Client } = require("@googlemaps/google-maps-services-js");
require('dotenv').config()
const cors = require('cors')
const app = express();

app.use(cors())

// Delay for getting additional pages from the google maps api
const delay = ms => new Promise(res => setTimeout(res, ms));


app.get("/nearby/:lat/:lng", async (req, res) => {

    const client = new Client({});

    const lat = req.params.lat
    const lng = req.params.lng

    let counter = 0
    let nextPageToken = undefined
    let places = []
    let alphabet = { "a": "", "b": "", "c": "", "d": "", "e": "", "f": "", "g": "", "h": "", "i": "", "j": "", "k": "", "l": "", "m": "", "n": "", "o": "", "p": "", "q": "", "r": "", "s": "", "t": "", "u": "", "v": "", "w": "", "x": "", "y": "", "z": "" };

    do {
        if (nextPageToken) {
            await delay(5000)
        }

        let placesResponseData = await getPlaces(client, lat, lng, nextPageToken)
        let places = placesResponseData.results
        nextPageToken = placesResponseData.next_page_token

        alphabet = matchPlacesToLetters(places, alphabet)
        console.log(alphabet)

        counter += 1
    }
    while (counter <= 3 && nextPageToken);

    return res.status(200).send(alphabet)

});

async function getPlaces(client, lat, lng, pageToken = undefined) {

    let result = []

    try {
        const response = await client
            .placesNearby({
                params: {
                    // Test coords: 37.40, -122.08 Palo Alto CA
                    location: { lat, lng },
                    radius: 600,
                    key: process.env.GOOGLE_MAPS_API_KEY,
                    pagetoken: pageToken
                },
                timeout: 1000, // milliseconds
            })

        console.log("HAS NEXT PAGE: ", response.data.next_page_token)
        result = response.data
    }
    catch (err) {
        console.log(err)
    }

    return result;

}

function matchPlacesToLetters(places, alphabet) {

    for (let place of places) {
        const firstLetterOfName = place.name.substring(0, 1).toLowerCase()

        if (alphabet[firstLetterOfName] === "") {
            alphabet[firstLetterOfName] = place
        }
    }

    return alphabet
}

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});