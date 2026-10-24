# 7. Kubernetes and GitOps

Kubernetes runs containers as Pods and uses controllers to keep the cluster close to declared desired state. A Deployment manages replicas; a Service gives a stable network address; ConfigMaps and Secrets provide configuration. Probes help Kubernetes decide whether a container is ready for traffic or needs restarting.

The manifests in `kubernetes/` deploy this handbook's sample API and Redis into a local cluster. They are a learning setup. Redis uses `emptyDir`, so its data is lost when its Pod is replaced.

## Try the local deployment

With a local Kubernetes cluster available, build the image and apply the manifests as described in [the Kubernetes guide](../kubernetes/README.md). Then inspect:

```powershell
kubectl get pods,services
kubectl describe deployment devops-playground
kubectl logs deployment/devops-playground
```

Use `kubectl port-forward service/devops-playground 3000:3000` to access the service locally. A `Running` Pod is useful information, but check readiness and the app's `/health` endpoint too.

## Where GitOps fits

Manual `kubectl apply` is useful while learning. In GitOps, desired manifests live in version control and an agent such as Argo CD continually reconciles the cluster to that state. A production setup also needs image publishing, environment-specific overlays, secrets management, policy, persistent storage, and rollback planning. This repository explains those ideas; it does not install Argo CD or implement a production deployment pipeline.
