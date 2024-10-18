const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('node:path');
const router = express.Router();
require('dotenv').config();  // Carrega as variáveis de ambiente

const app = express();

// Configurações do Handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para processar JSON e URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração da sessão
app.use(session({
  secret: process.env.SESSION_SECRET, // Usando uma variável de ambiente para maior segurança
  resave: true,
  saveUninitialized: true
}));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
const authRoutes = require('./routes/auth');
const homeRoutes = require('./routes/home');


app.use('/', authRoutes);
app.use('/', homeRoutes);

// Define a porta do servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}/`);
});
