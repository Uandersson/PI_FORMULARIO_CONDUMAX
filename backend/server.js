import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// === Banco em memória (sem Railway DB) ===
let usuarios = [
  { id: 1, user: "admin", senha: "1234", role: "admin" },
];

// === LOGIN ===
app.post("/login", (req, res) => {
  const { user, senha } = req.body;
  const found = usuarios.find(u => u.user === user && u.senha === senha);
  if (found) {
    res.json({ ok: true, role: found.role });
  } else {
    res.json({ ok: false });
  }
});

// === LISTAR ===
app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

// === CRIAR ===
app.post("/usuarios", (req, res) => {
  const { user, senha, role } = req.body;
  if (usuarios.find(u => u.user === user)) {
    return res.status(400).json({ error: "Usuário já existe" });
  }

  const novo = { id: Date.now(), user, senha, role };
  usuarios.push(novo);
  res.json(novo);
});

// === ATUALIZAR ===
app.put("/usuarios/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = usuarios.findIndex(u => u.id === id);

  if (idx === -1) return res.status(404).json({ error: "Usuário não encontrado" });

  usuarios[idx] = { ...usuarios[idx], ...req.body };
  res.json(usuarios[idx]);
});

// === EXCLUIR ===
app.delete("/usuarios/:id", (req, res) => {
  const id = Number(req.params.id);
  usuarios = usuarios.filter(u => u.id !== id);
  res.json({ ok: true });
});

app.listen(process.env.PORT || 3000, () => console.log("✅ Servidor rodando..."));
