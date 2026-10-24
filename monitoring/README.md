# Monitoring with Prometheus

The sample app exposes a request counter at `/metrics`; Prometheus scrapes it every 15 seconds. Start the stack from the repository root:

```powershell
docker compose -f monitoring/docker-compose.yml up --build -d
curl.exe http://localhost:3000/health
```

Open `http://localhost:9090`, query `http_requests_total`, and inspect **Status → Targets** for the `task-api` scrape. Prometheus is bound to loopback on port 9090.

The monitoring stack publishes its app on host port 3000. If the Docker example is already using that port, stop that stack first or change this file's host mapping to `3001:3000` and use `http://localhost:3001` for the app. Prometheus still scrapes `app:3000` over the Compose network.

If a target is down, check `docker compose -f monitoring/docker-compose.yml logs prometheus`. Stop the stack with `docker compose -f monitoring/docker-compose.yml down`; Redis data remains in its volume unless removed with `down -v`.

This is a learning example, not production metrics instrumentation. Add meaningful counters, latency histograms, and labels with bounded cardinality as the app grows.
