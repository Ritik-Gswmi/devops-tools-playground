# Minimal lab API

This is a small teaching example for the handbook's Docker, Redis, and monitoring labs. It demonstrates a health endpoint and a Redis-backed task queue; it is intentionally not a complete production application.

Requires Node.js 22 and a reachable Redis server. Start Redis from the repository root with `docker compose -f redis/docker-compose.yml up -d`, then run:

```sh
cd app
npm ci
npm test
npm start
```

The API listens on port 3000. `GET /health` checks the process, `GET /redis-health` checks Redis, and `GET /metrics` exposes a small Prometheus request counter. `POST /tasks` accepts JSON such as `{"task":"ship example"}` and creates a pending task in Redis. Set `REDIS_URL` and `PORT` to override defaults.
