const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.options('*', cors());
app.use(express.json());

const DUFFEL_TOKEN = process.env.DUFFEL_TOKEN || '';
const DUFFEL_BASE = 'https://api.duffel.com';

app.post('/search', async (req, res) => {
  try {
    const { origin, destination, date, returnDate, adults = 1 } = req.body;

    if (!origin || !destination || !date) {
      return res.status(400).json({ error: 'origin, destination e date são obrigatórios' });
    }

    const slices = [{ origin, destination, departure_date: date }];
    if (returnDate) {
      slices.push({ origin: destination, destination: origin, departure_date: returnDate });
    }

    const body = {
      data: {
        slices,
        passengers: Array(Number(adults)).fill({ type: 'adult' }),
        cabin_class: 'economy',
      },
    };

    const r = await fetch(`${DUFFEL_BASE}/air/offer_requests?return_offers=true`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${DUFFEL_TOKEN}`,
        'Duffel-Version': 'v2',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await r.json();

    if (!r.ok) {
      console.error('Duffel error:', JSON.stringify(data));
      return res.status(r.status).json(data);
    }

    res.json(data);
  } catch (e) {
    console.error('Server error:', e.message);
    res.status(500).json({ error: e.message });
  }
});

app.get('/', (_, res) => res.json({ status: 'ok', service: 'flight-intelligence-api' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));