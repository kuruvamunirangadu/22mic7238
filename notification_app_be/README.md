# Notification App Backend

Backend microservice for Campus Notifications deliverables.

## Endpoints

- `GET /health`
- `GET /notifications`
- `GET /notifications/priority/top10`

## Run

```bash
cd notification_app_be
npm install
```

Create `.env`:

```env
PORT=3001
TOKEN=your_access_token
```

Start server:

```bash
npm run dev
```

## Stage 6 behavior

`GET /notifications/priority/top10` fetches notifications from the evaluation API and computes top 10 based on:
- Type weight: `Placement > Result > Event`
- Recency tie-breaker: latest first

The service maintains top 10 in `O(N log 10)` using a min-heap.
