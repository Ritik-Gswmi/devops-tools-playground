# 5. Docker and local environments

A Docker image packages an application and its runtime dependencies. A container is a running instance of an image. Docker Compose describes related containers, their networks, configuration, and storage so a local stack can be started consistently.

In this repository, `docker/Dockerfile` builds the sample API. `docker/docker-compose.yml` runs that API with Redis. Compose creates a private network where the API reaches Redis by the service name `redis`; only the API port is published to the host.

## Run and inspect the stack

From the repository root:

```powershell
docker compose -f docker/docker-compose.yml up --build -d
docker compose -f docker/docker-compose.yml ps
docker compose -f docker/docker-compose.yml logs -f
curl.exe http://localhost:3000/health
docker compose -f docker/docker-compose.yml down
```

The Dockerfile starts from Node.js, copies the package manifests, installs locked production dependencies, copies the server, runs as the `node` user, and starts the app. The Compose health check reports whether the app and Redis are responding.

## Common issue

If another service already uses host port 3000, Compose cannot publish the app there. Change only the host side of the mapping, for example `3001:3000`; inside the container the app still listens on 3000. `down -v` removes named data volumes, so use it only when intentionally resetting stored data.
