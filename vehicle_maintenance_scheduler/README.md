# Vehicle Maintenance Scheduler

Optimized task scheduling service using 0/1 Knapsack algorithm for vehicle maintenance across multiple depots.

## Endpoints

- `GET /health` - Server status
- `GET /schedule` - Get optimized maintenance schedule

## Run

```bash
npm install
npm start
```

Create `.env`:

```env
PORT=3000
TOKEN=your_access_token
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
```

## How it works

- Fetches tasks and mechanic hours from API
- Uses 0/1 Knapsack (dynamic programming) to maximize impact within time constraints
- Returns optimal task assignments per depot
- Time complexity: O(n × m)

## Key Features

- Enterprise logging middleware
- Global error handling
- RESTful API design
- Production-ready code
