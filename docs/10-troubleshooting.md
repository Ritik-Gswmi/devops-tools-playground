# 10. Troubleshooting

Debug one boundary at a time. Confirm the expected state, inspect the component that owns it, then follow the request or deployment to its next dependency. Record the exact command and error before changing configuration.

## Local containers

```powershell
docker compose -f docker/docker-compose.yml ps
docker compose -f docker/docker-compose.yml logs --tail=100 app
docker compose -f docker/docker-compose.yml logs --tail=100 redis
```

Check that Docker is running, required files exist, host ports are available, and dependent services are healthy. A container being `Up` does not prove the app can reach Redis.

## Kubernetes

```powershell
kubectl get pods,services
kubectl describe pod <pod-name>
kubectl logs <pod-name> --all-containers=true
kubectl get events --sort-by=.lastTimestamp
```

Look for image pull errors, failed probes, missing configuration, and unscheduled Pods. Verify the current kubectl context points to the cluster you intend to inspect.

## CI and Prometheus

Open the failed GitHub Actions step and inspect its command output. For Prometheus, inspect **Status → Targets** and check whether `app:3000` is reachable from the Prometheus container. Make one change at a time, then repeat the check that originally failed.
