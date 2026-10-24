# Kubernetes example

These manifests run the API and one internal Redis pod. Build the image and make it available to your local cluster (image import commands differ by cluster):

```sh
docker build -f docker/Dockerfile -t devops-tools-playground:local .
kubectl apply -f kubernetes/
kubectl get pods,services
kubectl port-forward service/devops-playground 3000:3000
curl http://localhost:3000/health
kubectl logs deployment/devops-playground
```

The app Service gives stable cluster networking, the ConfigMap supplies non-secret settings, and probes check application health. Redis is exposed only through a ClusterIP Service. Its `emptyDir` data is lost when the pod is replaced; use a StatefulSet and PersistentVolumeClaim when you need persistence. Change the Redis eviction policy before relying on queued tasks. The learning config disables Redis protected mode so the app can connect over the internal Service; keep Redis internal and add authentication before exposing it. Replace the local image name with a published image for remote clusters. Remove the examples with `kubectl delete -f kubernetes/`.
