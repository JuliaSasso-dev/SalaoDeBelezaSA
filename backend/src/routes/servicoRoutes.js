import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: "Listar serviços (corte, manicure, maquiagem, etc.)" });
});

router.post('/', (req, res) => {
  res.json({ message: "Serviço cadastrado com sucesso!" });
});

export default router;