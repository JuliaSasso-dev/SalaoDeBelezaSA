import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
  res.json({ message: "Agendamento criado com validação de conflito!" });
});

router.get('/', (req, res) => {
  res.json({ message: "Listar agendamentos" });
});

router.patch('/:id/status', (req, res) => {
  const { id } = req.params;
  res.json({ message: `Agendamento ${id} atualizado com sucesso!` });
});

export default router;