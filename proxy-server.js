const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/lemmatizer', async (req, res) => {
    const apiKey = 'fa81748193bf28474ee271522291f6d901816d20cd516e61ea84238b';
    const apiUrl = 'https://api.textrazor.com/v1/lemmatizer';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-textrazor-key': apiKey
            },
            body: JSON.stringify(req.body)
        });
        const result = await response.json();
        res.json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`);
});
