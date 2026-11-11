import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
  const { data } = req.body; // Espera a data no formato "YYYY-MM-DD" ou "YYYY-MM-DDTHH:mm:ss"

  if (!data) {
    return res.status(400).json({ error: "A data do agendamento é obrigatória." });
  }

  // Converte a string de data enviada em um objeto Date
  const dataAgendamento = new Date(data);
  const dataAtual = new Date();

  // Zera as horas/minutos/segundos da data atual para comparar apenas o dia civil
  dataAtual.setHours(0, 0, 0, 0);

  // Validações:
  // 1. isNaN(...) detecta se a data é inválida
  // 2. dataAgendamento.getFullYear() < 2026 previne anos antigos como 0001
  // 3. dataAgendamento < dataAtual impede agendamentos no passado
  if (
    isNaN(dataAgendamento.getTime()) || 
    dataAgendamento.getFullYear() < dataAtual.getFullYear() || 
    dataAgendamento < dataAtual
  ) {
    return res.status(400).json({ 
      error: "Por favor, selecione uma data válida a partir de hoje." 
    });
  }

  // Se passou pelas validações, continua a lógica do agendamento
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