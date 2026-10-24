# 9. Security basics

Security applies throughout the workflow: source control, CI permissions, images, runtime configuration, network access, and cluster access. Start by protecting credentials and limiting which components can communicate.

## Before sharing or deploying

- Keep real `.env` files, tokens, and private data out of Git.
- Store CI credentials in GitHub secrets and grant workflows only the permissions they need.
- Keep Redis and databases off public interfaces; require authentication and network controls.
- Use TLS for public traffic and protect signing keys.
- Update base images and dependencies; review vulnerability reports.
- Run containers as non-root where practical and set resource limits.
- Use persistent storage and backups for data that must survive restarts.

The local Redis examples disable protected mode so the app can connect on the private demo network without a password. Port exposure is loopback-bound in the standalone Redis example, but the configuration is still for learning only. Do not expose it to an untrusted network. The Kubernetes Redis example is internal to the cluster and uses temporary storage.

## Exercise

Review each Compose `ports` entry. Which ports are reachable from the host? Which services are only reachable on the Compose network? Then inspect `.gitignore` and identify which files might contain local secrets.
