# 4. Configuration and secrets

The same application needs different settings on a laptop, in CI, and in a cluster. Keep environment-specific values outside the source code and pass them to the process at runtime. Credentials belong in a secret store, not in Git or a container image.

In this sample, `REDIS_URL` and `PORT` configure the API. Compose sets the Redis URL to the service name `redis`; the Kubernetes ConfigMap provides the API port and Redis URL. The example has no real credentials, but the same separation applies to passwords, API keys, and signing secrets.

## Rules of thumb

- Commit example files with placeholder values only.
- Keep real `.env` files out of Git; review `.gitignore` before committing.
- Give each environment its own credentials and access scope.
- Rotate a credential if it is accidentally committed; removing the line does not erase it from Git history.
- Use the environment's runtime secret mechanism instead of baking credentials into images.

## Try it

Find `REDIS_URL` in `app/server.js`, `docker/docker-compose.yml`, and `kubernetes/configmap.yaml`. Explain why the hostname differs from `localhost` in Compose and Kubernetes: each environment has its own network and service discovery. Never put a real secret in these example files.
