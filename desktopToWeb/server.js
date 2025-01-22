const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const ip = 'http://your-api-url'; // Replace with your actual API URL

app.get('/api/getmodes', async (req, res) => {
    try {
        const response = await fetch(`${ip}/v1/getmodes`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch operating modes' });
    }
});

app.get('/api/getOperatorMode', async (req, res) => {
    const { name } = req.query;
    try {
        const response = await fetch(`${ip}/v1/getOperatorMode?name=${name}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch operator mode' });
    }
});

app.get('/api/getOperatingMode', async (req, res) => {
    const { mode } = req.query;
    try {
        const response = await fetch(`${ip}/v1/getOperatingMode?mode=${mode}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch operating mode' });
    }
});

app.get('/api/getParentId', async (req, res) => {
    const { id } = req.query;
    try {
        const response = await fetch(`${ip}/v1/lookup/parent/${id}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch parent ID' });
    }
});

app.get('/api/getAssetID', async (req, res) => {
    const { id } = req.query;
    try {
        const response = await fetch(`${ip}/v1/parent/add/${id}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch asset ID' });
    }
});

app.post('/api/retryAssetScan', async (req, res) => {
    const { reference, asset } = req.body;
    try {
        const response = await fetch(`${ip}/v1/parent/add/${asset}?reference=${reference}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reference, asset })
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retry asset scan' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
