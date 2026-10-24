# Docker example

An image is the built application template; a container is a running instance of that image. The Dockerfile starts from a small Node 22 Alpine image, sets production mode and `/app`, copies the npm manifests, installs locked production dependencies with `npm ci`, copies the server, runs as the unprivileged `node` user, documents port 3000, and starts the server.

Compose builds from the repository root so the Dockerfile can copy `app/`. It starts Redis with the repository config and persistent named volume, waits for Redis health before starting the API, connects the API using the Compose service name `redis`, and publishes only the API port.

```sh
docker compose -f docker/docker-compose.yml up --build -d
docker compose -f docker/docker-compose.yml ps
docker compose -f docker/docker-compose.yml logs -f
curl http://localhost:3000/redis-health
docker compose -f docker/docker-compose.yml down
```

If startup fails, inspect `logs`, check `ps` health status, and verify Docker is running. Rebuild after Dockerfile changes. `down -v` also deletes Redis data, so use it only when you intend to reset the example.
