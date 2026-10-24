# Handbook contents

This handbook follows a small sample service from a developer's workstation to a running, monitored deployment. The example app is in this repository, so you can read the code and configuration alongside each chapter.

## Chapters

| Order | Topic | You will understand |
|---|---|---|
| 1 | [DevOps workflow](01-devops-workflow.md) | How development, delivery, and operations form a feedback loop |
| 2 | [Development and Git](02-development-and-git.md) | How a change moves through a branch, review, and merge |
| 3 | [Testing and CI](03-testing-and-ci.md) | How automated checks run and what they prove |
| 4 | [Configuration and secrets](04-configuration-and-secrets.md) | How services receive settings safely across environments |
| 5 | [Docker and local environments](05-docker-and-local-environments.md) | How images, containers, and Compose provide repeatable runs |
| 6 | [Redis and queues](06-redis-and-queues.md) | How an API can hand asynchronous work to a queue |
| 7 | [Kubernetes and GitOps](07-kubernetes-and-gitops.md) | How Kubernetes applies desired state and how GitOps extends it |
| 8 | [Monitoring and feedback](08-monitoring-and-feedback.md) | How health, metrics, and logs help operators learn about a service |
| 9 | [Security](09-security.md) | How to protect credentials, images, and services |
| 10 | [Troubleshooting](10-troubleshooting.md) | A repeatable method for diagnosing failures |

## How to use the handbook

Read the chapters in order the first time. For each one, inspect the linked files in this repository, then try its commands. The sample app and manifests are intentionally small so each tool is easier to understand. GitOps, image publishing, and production operations are explained as concepts and extension exercises; they are not preconfigured here.
