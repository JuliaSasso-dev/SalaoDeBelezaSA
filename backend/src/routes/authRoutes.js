import express from 'express';

const router = express.Router();

router.post('/register', (req, res) => {
  res.json({ message: "Rota de cadastro funcionando!" });
});

router.post('/login', (req, res) => {
  res.json({ message: "Rota de login funcionando!" });
});

export default router;