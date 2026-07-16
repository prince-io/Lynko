const PORT = process.env.PORT || 3000;
const BASE = `http://localhost:${PORT}`;
const url = `${BASE}/api/cron/cleanup-deleted`;

async function run() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(`[${new Date().toISOString()}] Cleaned ${data.cleaned} users`);
  } catch {
    // server not ready yet — retry on next interval
  }
}

setTimeout(run, 5000);
setInterval(run, 10000);
