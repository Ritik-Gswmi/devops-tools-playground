const { test } = require("node:test");
const assert = require("node:assert/strict");
const { once } = require("node:events");
const { app } = require("./server");

async function withServer(run) {
  const server = app.listen(0, "127.0.0.1");
  await once(server, "listening");

  try {
    const address = server.address();
    await run(`http://127.0.0.1:${address.port}`);
  } finally {
    if (server.listening) {
      await new Promise((resolve, reject) => {
        server.close((err) => err ? reject(err) : resolve());
      });
    }
  }
}

test("health endpoint returns OK", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/health`);

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: "ok" });
  });
});

test("tasks endpoint rejects an empty task", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: "  " })
    });

    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), {
      error: "A non-empty task string is required"
    });
  });
});
