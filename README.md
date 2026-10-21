Lumière Agenda - Sistema de agendamento para Salão de Beleza

Nomes do Integrantes: Polyana Melo, Julia Sasso e Yasmin Rocha
Empresa: Lumiere Agenda

 1. Proposta de Desenvolvimento e Objetivo da Empresa

A lógica se resume a criar registros com data/hora e validar se aquele horário já está ocupado. É o clássico sistema "CRUD + Calendário".

Estrutura da Aplicação
Landing Page (LP): Apresenta o salão, mapa de localização e botão "Agendar Horário".
Login/Cadastro: Clientes criam conta para agendar, dono e funcionários acessam a área restrita de gestão.
App (Área Logada):
o	Visão do Cliente: Escolhe o serviço (Ex: Corte, manicure, tratamento facial, hidratações, alisamento, pintar o cabelo, maquiagem), escolhe o profissional, seleciona a data/horário disponível e confirma. Pode verificar seus horários marcados.
o	Visão do Profissional: Agenda simples em formato de lista/tabela com os cortes do dia.

2. Requisitos do Sistema
Requisitos Funcionais (RF)
•	RF01: O cliente deve conseguir visualizar os horários disponíveis de um profissional para determinado dia.
•	RF02: O cliente deve conseguir realizar o agendamento escolhendo serviço, data e hora.
•	RF03: O sistema deve impedir dois agendamentos no mesmo horário para o mesmo profissional.
•	RF04: O profissional deve conseguir cancelar ou marcar um agendamento como "concluído".

 Requisitos Não Funcionais (RNF)
•	RNF01: A validação de disponibilidade de horário deve ocorrer no backend para evitar agendamentos duplicados por requisições concorrentes.
•	RNF02: O sistema deve armazenar as datas em formato UTC no banco de dados.

3. Visão de Mercado
O setor de beleza, estética e manicure é um dos mais procurados atualmente, mas muitos profissionais ainda usam whatsapp ou agenda de papel para marcar, o site estaria disponível 24 horas para o cliente agendar seu horário, sem se preocupar se duas pessoas estão com o mesmo horário agendado e economizaria o tempo do profissional.
Ajudaria o cliente também caso precisasse cancelar com antecedência.
