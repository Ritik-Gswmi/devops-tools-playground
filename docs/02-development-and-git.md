# 2. Development and Git

Version control records how software changes. A branch gives you a safe place to make one focused change; a pull request lets others review it and see automated checks before it becomes part of the shared branch.

## A practical change flow

From a clone of this repository:

1. Start from an up-to-date `main` branch.
2. Create a short-lived branch, such as `docs/improve-redis-guide`.
3. Make one focused change to the handbook or the sample app.
4. Run the relevant local checks.
5. Commit with a message that describes the intent.
6. Push the branch and open a pull request.
7. Review the diff and CI results, address feedback, then merge.

Keep pull requests small enough to understand. Include the problem, the change, and how you verified it. Do not commit `.env` files, tokens, private data, or generated dependencies.

## Try it

Create a documentation-only branch, fix a typo, open a pull request, inspect the workflow result, and merge it. Then repeat with a small validation change in `app/server.js`. Notice how the same collaboration workflow works for both code and documentation.

## Check your understanding

Why review a change before merging? Which files and checks help reviewers decide whether it is safe? The goal is a clear, auditable change, not a particular branching model; teams can adapt the details to their size and release needs.
