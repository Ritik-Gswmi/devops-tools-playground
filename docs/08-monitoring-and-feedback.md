# 8. Monitoring and feedback

Monitoring helps answer whether a service is available, whether it is behaving well, and where to investigate when it is not. Health checks answer a narrow readiness question; metrics show trends; logs provide event detail; user reports reveal impact that infrastructure signals may miss.

The sample app exposes a request counter at `/metrics`. The Prometheus configuration in `monitoring/prometheus.yml` scrapes it every 15 seconds. This is intentionally a tiny demonstration, not a complete observability setup.

## Try the monitoring stack

```powershell
docker compose -f monitoring/docker-compose.yml up --build -d
curl.exe http://localhost:3000/health
```

Open `http://localhost:9090`, query `http_requests_total`, and inspect **Status → Targets**. The counter should increase after a request and the next scrape. Stop the stack with `docker compose -f monitoring/docker-compose.yml down`.

## Practice an operations loop

Generate a request, inspect the metric, then check `docker compose -f monitoring/docker-compose.yml logs app`. Ask what changed and what a user would notice. In Kubernetes, compare application logs, Pod events, and readiness state. For production, choose indicators and alerts around user-visible behavior, not only whether a process is running.
