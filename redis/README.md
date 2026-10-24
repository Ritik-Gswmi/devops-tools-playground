# Redis example

Run an isolated Redis instance with local-only port binding, a persistent named volume, and the shared configuration:

```sh
docker compose -f redis/docker-compose.yml up -d
docker compose -f redis/docker-compose.yml exec redis redis-cli ping
docker compose -f redis/docker-compose.yml exec redis redis-cli SET demo hello
docker compose -f redis/docker-compose.yml exec redis redis-cli GET demo
docker compose -f redis/docker-compose.yml exec redis redis-cli RPUSH tasks:queue 1
docker compose -f redis/docker-compose.yml exec redis redis-cli LRANGE tasks:queue 0 -1
docker compose -f redis/docker-compose.yml restart redis
docker compose -f redis/docker-compose.yml exec redis redis-cli GET demo
docker compose -f redis/docker-compose.yml down
```

The API uses an integer counter (`INCR`) to allocate IDs, hashes (`HSET`) to store task fields, and a list (`RPUSH`) as the pending queue. The health check runs `PING`. The named volume preserves append-only persistence across container recreation. The config caps Redis memory at 128 MB and evicts least recently used keys when full; that policy suits a cache demo but can remove task data. Do not use it for durable queues without changing the policy and designing backups.

This learning configuration disables Redis protected mode because the app connects over Docker's private network without a password. The standalone example publishes Redis only on `127.0.0.1`. Do not expose this no-password configuration to an untrusted network; production setups should use authentication and network controls.
