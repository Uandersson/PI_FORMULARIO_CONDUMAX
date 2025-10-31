const { Pool } = require("pg");

const db = new Pool({
  host: "maglev.proxy.rlwy.net", // ← host
  user: "postgres",              // ← user
  password: "pZdRagJdqgYvHgTdbECTlAGDrUdhKZkT", // ← password
  database: "railway",           // ← database
  port: 47475,                   // ← port
  ssl: { rejectUnauthorized: false } // ← importante para conexões na nuvem
});

db.connect()
  .then(() => console.log("✅ Conectado ao banco PostgreSQL na nuvem"))
  .catch(err => console.error("❌ Erro ao conectar ao banco:", err));

module.exports = db;