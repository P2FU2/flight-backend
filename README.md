# Flight Intelligence API

Backend proxy para o widget de busca de voos.

## Deploy no Render (grátis)

1. Suba este código para um repositório GitHub (novo repo, pode ser privado)
2. Acesse https://render.com e crie conta
3. New > Web Service > conecte o repositório
4. Configure a variável de ambiente: DUFFEL_TOKEN = seu token do Duffel
5. Deploy automático — anote a URL gerada (ex: https://flight-intelligence-api.onrender.com)

## Variáveis de ambiente

- DUFFEL_TOKEN: Token do Duffel (https://app.duffel.com → Developers → Access tokens)

## Endpoints

POST /search
Body: { origin, destination, date, returnDate (opcional), adults }

GET /
Health check
