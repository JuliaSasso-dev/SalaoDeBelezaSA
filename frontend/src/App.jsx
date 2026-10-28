import React, { useState } from 'react';
import Button from './components/Button';
import InputField from './components/InputField';
import Sidebar from './components/Sidebar';
import Modal from './components/Modal';
import './App.css';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const [registeredUsers, setRegisteredUsers] = useState([
    {
      nome: 'Maria Silva',
      email: 'maria@email.com',
      senha: '123',
      tipoPerfil: 'cliente'
    }
  ]);

  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    servico: 'Corte & Escova',
    data: '',
    hora: ''
  });

  const [authData, setAuthData] = useState({
    nome: '',
    email: '',
    senha: '',
    tipoPerfil: 'cliente'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuthChange = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const handleOpenBooking = () => {
    if (!user) {
      setAuthMode('login');
      setIsAuthModalOpen(true);
    } else {
      setIsBookingModalOpen(true);
    }
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();

    if (authMode === 'login') {
      const existingUser = registeredUsers.find(
        (u) => u.email.toLowerCase() === authData.email.toLowerCase() && u.senha === authData.senha
      );

      if (!existingUser) {
        alert('Erro: Conta não encontrada ou senha incorreta! Cadastre-se antes de fazer login.');
        return;
      }

      setUser(existingUser);
      alert(`Login efetuado com sucesso! Bem-vindo(a), ${existingUser.nome}.`);

    } else {
      const emailExists = registeredUsers.some(
        (u) => u.email.toLowerCase() === authData.email.toLowerCase()
      );

      if (emailExists) {
        alert('Erro: Este e-mail já está cadastrado! Alterne para a aba de Login.');
        return;
      }

      const newUser = {
        nome: authData.nome,
        email: authData.email,
        senha: authData.senha,
        tipoPerfil: authData.tipoPerfil
      };

      setRegisteredUsers((prev) => [...prev, newUser]);
      setUser(newUser);
      alert(`Conta criada com sucesso para ${newUser.nome}!`);
    }

    if (!formData.nome && authData.nome) {
      setFormData((prev) => ({ ...prev, nome: authData.nome }));
    }

    setIsAuthModalOpen(false);
    setIsBookingModalOpen(true);
    setAuthData({ nome: '', email: '', senha: '', tipoPerfil: 'cliente' });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      setIsBookingModalOpen(false);
      setAuthMode('login');
      setIsAuthModalOpen(true);
      return;
    }

    alert(`Agendamento realizado para ${formData.nome || user.nome} no dia ${formData.data} às ${formData.hora}!`);
    setIsBookingModalOpen(false);
    setFormData({ nome: '', telefone: '', servico: 'Corte & Escova', data: '', hora: '' });
  };

  const handleLogout = () => {
    setUser(null);
    alert('Você saiu da sua conta.');
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
            {user ? (
              <div className="user-profile-menu">
                <span className="user-greeting">Olá, <strong>{user.nome}</strong></span>
                <Button variant="ghost" onClick={handleLogout}>Sair</Button>
              </div>
            ) : (
              <Button variant="outline" onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }}>
                Login
              </Button>
            )}

            <Button onClick={handleOpenBooking}>
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
            <Button onClick={handleOpenBooking}>
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
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)}
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

      <Modal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        title={authMode === 'login' ? 'Acessar Conta' : 'Criar Conta'}
      >
        <p className="auth-notice-text">
          Faça login ou cadastre-se para prosseguir com o agendamento do seu horário.
        </p>

        <div className="auth-tabs">
          <button 
            type="button" 
            className={`auth-tab ${authMode === 'login' ? 'active' : ''}`}
            onClick={() => setAuthMode('login')}
          >
            Login
          </button>
          <button 
            type="button" 
            className={`auth-tab ${authMode === 'register' ? 'active' : ''}`}
            onClick={() => setAuthMode('register')}
          >
            Cadastrar
          </button>
        </div>

        <form onSubmit={handleAuthSubmit} className="modal-form">
          {authMode === 'register' && (
            <InputField 
              label="Nome Completo" 
              name="nome"
              type="text"
              value={authData.nome}
              onChange={handleAuthChange}
              placeholder="Seu nome"
              required
            />
          )}

          <InputField 
            label="E-mail" 
            name="email"
            type="email"
            value={authData.email}
            onChange={handleAuthChange}
            placeholder="seu@email.com"
            required
          />

          <InputField 
            label="Senha" 
            name="senha"
            type="password"
            value={authData.senha}
            onChange={handleAuthChange}
            placeholder="••••••••"
            required
          />

          {authMode === 'register' && (
            <div className="input-container">
              <label htmlFor="tipoPerfil" className="input-label">
                Tipo de Acesso
              </label>
              <select
                id="tipoPerfil"
                name="tipoPerfil"
                value={authData.tipoPerfil}
                onChange={handleAuthChange}
                className="input-element"
              >
                <option value="cliente">Cliente (Agendamentos)</option>
                <option value="funcionario">Funcionário / Equipe</option>
                <option value="dono">Dono / Gestão</option>
              </select>
            </div>
          )}

          <div className="form-submit">
            <Button type="submit" fullWidth>
              {authMode === 'login' ? 'Entrar e Continuar Agendamento' : 'Cadastrar e Continuar Agendamento'}
            </Button>
          </div>

          <div className="auth-switch-footer">
            {authMode === 'login' ? (
              <p>
                Ainda não tem conta?{' '}
                <button type="button" className="auth-link-action" onClick={() => setAuthMode('register')}>
                  Cadastre-se aqui
                </button>
              </p>
            ) : (
              <p>
                Já possui uma conta?{' '}
                <button type="button" className="auth-link-action" onClick={() => setAuthMode('login')}>
                  Faça login
                </button>
              </p>
            )}
          </div>
        </form>
      </Modal>

    </div>
  );
}