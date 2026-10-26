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

Open the failed GitHub Actions step and inspect its command output. For Prometheus, inspect **Status → Targets** and check whether `app:3000` is reachable from the Prometheus container.

For detailed CI debugging steps, see the GitHub Actions troubleshooting section below. Make one change at a time, then repeat the check that originally failed.

## GitHub Actions troubleshooting

### Workflow does not run

- Open the repository's **Actions** tab and check whether the workflow was triggered.
- Inspect the workflow's `on:` configuration for the expected events and branch filters.
- Confirm that the workflow file is stored under `.github/workflows/`.
- Check repository settings and workflow permissions if a run is blocked.

### Dependency installation fails

If `npm ci` fails, run the following commands from the app directory:

```powershell
cd app
npm ci
```

- Confirm that `package.json` and `package-lock.json` are committed.
- Ensure the lockfile matches the declared dependencies.
- Check the Node.js version configured in the workflow.
- Read the first meaningful error in the installation logs.

### Tests fail in CI

Reproduce the test failure locally:

```powershell
cd app
npm ci
npm test
```

- Check the failing assertion and stack trace.
- Look for missing environment variables or files.
- Check whether the test depends on time, network access, or external services.
- Fix the underlying issue rather than skipping the failing test.

### Docker build fails

Run the build from the repository root:

```powershell
docker build -f app/Dockerfile -t devops-playground-app ./app
```

Check that the Dockerfile path, build context, `COPY` instructions, and required files are correct. Read the first relevant build error rather than focusing only on the final failure message.

### Read workflow logs effectively

1. Open **Actions** and select the failed workflow run.
2. Open the job that failed.
3. Expand the failed step and inspect its output.
4. Identify the earliest relevant error.
5. Make one change and rerun the workflow.

Avoid printing secrets in logs. Enable additional debug logging only when necessary and follow GitHub's guidance for handling sensitive values.

### Troubleshooting checklist

- [ ] Did the workflow trigger on the expected event?
- [ ] Are dependency files and configuration committed?
- [ ] Can the failing command run locally?
- [ ] Are required services and environment variables available?
- [ ] Does the workflow have the necessary permissions?
- [ ] Did the workflow pass after the fix?

## Exercise

Introduce a harmless test failure on your feature branch, inspect the failed Actions run, fix the test, and confirm that the workflow passes again.
