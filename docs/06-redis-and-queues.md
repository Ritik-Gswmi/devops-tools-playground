# 6. Redis and asynchronous work

A queue separates a request that creates work from the process that completes it. An API can record a task and enqueue an identifier; a worker can take that identifier, perform the work, and save the result. This lets the API respond quickly and allows workers to scale separately.

The sample API in `app/server.js` demonstrates the producer side. It increments a Redis counter to create an ID, stores task fields in a hash, and pushes the ID onto a list. It does not include a worker, so tasks remain `pending`.

## Try the Redis lab

```powershell
docker compose -f redis/docker-compose.yml up -d
docker compose -f redis/docker-compose.yml exec redis redis-cli ping
docker compose -f redis/docker-compose.yml exec redis redis-cli SET demo hello
docker compose -f redis/docker-compose.yml exec redis redis-cli GET demo
docker compose -f redis/docker-compose.yml down
```

To watch the API create a queue entry, start the app stack from the repository root and submit a task in PowerShell:

```powershell
docker compose -f docker/docker-compose.yml up --build -d
$body = @{ task = "learn Redis queues" } | ConvertTo-Json -Compress
Invoke-RestMethod -Uri "http://localhost:3000/tasks" -Method Post -ContentType "application/json" -Body $body
docker compose -f docker/docker-compose.yml exec redis redis-cli LRANGE tasks:queue 0 -1
docker compose -f docker/docker-compose.yml down
```

For standalone Redis experiments, see [the Redis guide](../redis/README.md). Inspect `tasks:queue` and `task:<id>` with `redis-cli` to see how the API represents work.

## Queue design questions

A real worker needs decisions about retries, duplicate delivery, poison messages, timeouts, and what happens when Redis is unavailable. A queue alone does not guarantee exactly-once processing. Try extending the sample with a separate worker and a task status transition from `pending` to `completed`.
