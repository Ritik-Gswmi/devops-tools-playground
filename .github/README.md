# GitHub Actions

This folder contains GitHub-specific configuration and notes. The runnable workflow is in [`workflows/ci.yml`](workflows/ci.yml), where GitHub discovers workflow files.

The workflow runs when code is pushed to `main` or a pull request targets `main`. It checks out the repository, installs the app's locked Node.js dependencies, runs the tests, and builds the Docker image. It does not publish the image or deploy the app.

For the full explanation and exercises, see [Testing and CI](../docs/03-testing-and-ci.md).
