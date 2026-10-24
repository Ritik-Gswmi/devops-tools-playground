# 3. Testing and continuous integration

Tests check whether software behaves as expected. Continuous integration (CI) runs selected checks automatically when a change is pushed or a pull request is opened, so results are repeatable and visible to reviewers.

The sample app has a health endpoint test in `app/server.test.js`. The workflow in `.github/workflows/ci.yml` checks out the code, sets up Node.js, installs dependencies, runs the test command, and builds a Docker image. GitHub discovers workflows from `.github/workflows/`.

## Read the workflow

Identify its trigger, job, runner, and ordered steps. Then answer:

- Which events start the workflow?
- Which step runs the tests?
- Does a green run publish or deploy the image? (In this example, no.)
- Where would you add a step if you wanted to publish an image later?

A green build means the configured checks passed. It does not prove every behavior or production scenario is correct.

## Try it locally

```powershell
cd app
npm ci
npm test
```

Make a small change to the health response, update its test, and open a pull request. Observe the workflow run and inspect its logs if it fails. Add new checks only when they provide a clear signal, such as linting or an integration test against Redis.
