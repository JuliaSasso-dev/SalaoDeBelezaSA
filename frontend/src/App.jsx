import React, { useState } from 'react';
import Button from './components/Button';
import InputField from './components/InputField';
import Sidebar from './components/Sidebar';
import Modal from './components/Modal';
import './App.css';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    servico: 'Corte & Escova',
    data: '',
    hora: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert(`Agendamento realizado para ${formData.nome} no dia ${formData.data} às ${formData.hora}!`);
    setIsModalOpen(false);
    setFormData({ nome: '', telefone: '', servico: 'Corte & Escova', data: '', hora: '' });
  };

  return (
    <div className="app-container">
      
      <header className="header">
        <div className="header-content">
          <h1 className="logo">Lumière</h1>
          
          <nav className="desktop-nav">
            <a href="#home">Início</a>
            <a href="#servicos">Serviços</a>
          </nav>

          <div className="header-actions">
            <Button onClick={() => setIsModalOpen(true)}>
              Agendar Horário
            </Button>
            <button 
              className="menu-hamburger"
              onClick={() => setIsSidebarOpen(true)}
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      <section id="home" className="hero-section">
        <div className="hero-content">
          <span className="badge">Experiência Premium</span>
          <h2 className="hero-title">Realce sua beleza natural com nossos especialistas.</h2>
          <p className="hero-description">
            Oferecemos cuidados completos em cortes, coloração, estética facial e tratamentos exclusivos em um ambiente relaxante e moderno.
          </p>
          <div className="hero-buttons">
            <Button onClick={() => setIsModalOpen(true)}>
              Agendar Horário
            </Button>
            <Button variant="outline" onClick={() => {
              document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Ver Serviços
            </Button>
          </div>
        </div>
      </section>

      <section id="servicos" className="services-section">
        <div className="services-content">
          <h3 className="section-title">Nossos Serviços</h3>
          <div className="services-grid">
            {[
              { title: 'Corte & Finalização', price: 'A partir de R$ 90' },
              { title: 'Coloração & Mechas', price: 'A partir de R$ 220' },
              { title: 'Tratamentos Capilares', price: 'A partir de R$ 130' },
              { title: 'Manicure & Pedicure', price: 'A partir de R$ 60' },
              { title: 'Design de Sobrancelhas', price: 'A partir de R$ 50' },
              { title: 'Maquiagem Profissional', price: 'A partir de R$ 180' },
            ].map((servico) => (
              <div key={servico.title} className="service-card">
                <h4>{servico.title}</h4>
                <p>{servico.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Salão Lumière</p>
      </footer>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Agende seu Horário"
      >
        <form onSubmit={handleBookingSubmit} className="modal-form">
          <InputField 
            label="Nome Completo" 
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Seu nome"
            required
          />

          <InputField 
            label="Telefone / WhatsApp" 
            name="telefone"
            type="tel"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="(00) 00000-0000"
            required
          />

          <div className="input-container">
            <label htmlFor="servico" className="input-label">
              Serviço Desejado
            </label>
            <select
              id="servico"
              name="servico"
              value={formData.servico}
              onChange={handleChange}
              className="input-element"
            >
              <option>Corte & Escova</option>
              <option>Coloração & Mechas</option>
              <option>Tratamentos Capilares</option>
              <option>Manicure & Pedicure</option>
              <option>Design de Sobrancelhas</option>
              <option>Maquiagem Profissional</option>
            </select>
          </div>

          <div className="form-row">
            <InputField 
              label="Data" 
              name="data"
              type="date"
              value={formData.data}
              onChange={handleChange}
              required
            />
            <InputField 
              label="Horário" 
              name="hora"
              type="time"
              value={formData.hora}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-submit">
            <Button type="submit" fullWidth>
              Confirmar Agendamento
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}