import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: "Listar profissionais do salão" });
});

router.get('/:id/disponibilidade', (req, res) => {
  const { id } = req.params;
  const { data } = req.query;
  res.json({ message: `Horários disponíveis para o profissional ${id} na data ${data}` });
});

export default router;