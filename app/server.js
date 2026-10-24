const express = require("express");
const { createClient } = require("redis");

const app = express();
app.use(express.json());
let requestCount = 0;
app.use((req, res, next) => {
  if (req.path !== "/metrics") requestCount += 1;
  next();
});

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
const redis = createClient({ url: redisUrl });

redis.on("error", (err) => {
  console.error("Redis error:", err.message);
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/metrics", (req, res) => {
  res.type("text/plain; version=0.0.4").send(
    `# HELP http_requests_total Total HTTP requests excluding metrics scrapes.\n# TYPE http_requests_total counter\nhttp_requests_total ${requestCount}\n`
  );
});

app.get("/redis-health", async (req, res) => {
  try {
    await redis.ping();
    res.json({ status: "ok", redis: "connected" });
  } catch {
    res.status(503).json({ status: "error", redis: "unavailable" });
  }
});

app.post("/tasks", async (req, res) => {
  const { task } = req.body;

  if (typeof task !== "string" || !task.trim()) {
    return res.status(400).json({
      error: "A non-empty task string is required"
    });
  }

  try {
    const id = await redis.incr("tasks:next-id");
    await redis.hSet(`task:${id}`, { id: String(id), task: task.trim(), status: "pending" });
    await redis.rPush("tasks:queue", String(id));
    res.status(201).json({ id, task: task.trim(), status: "pending" });
  } catch {
    res.status(503).json({ error: "Task store is unavailable" });
  }
});

async function start() {
  await redis.connect();

  const port = process.env.PORT || 3000;

  app.listen(port, "0.0.0.0", () => {
    console.log(`Server listening on port ${port}`);
  });
}

if (require.main === module) {
  start().catch((err) => {
    console.error("Startup failed:", err);
    process.exit(1);
  });
}

module.exports = { app };
