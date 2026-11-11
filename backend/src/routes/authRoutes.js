import express from 'express';

const router = express.Router();

router.post('/register', (req, res) => {
  const { email, password } = req.body;

  const gmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !gmailRegex.test(email.trim())) {
    return res.status(400).json({ 
      error: "E-mail inválido. Por favor, insira um e-mail válido terminado em @gmail.com." 
    });
  }

  return res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
});

router.post('/login', (req, res) => {
  res.json({ message: "Rota de login funcionando!" });
});

export default router;