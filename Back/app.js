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

// Rotas (Routes contem todas as rotas)
const authRoutes = require('./routes/auth');
const Routes = require('./routes/routes');
const ClassRoutes = require('./routes/Personagem');


app.use('/', authRoutes);
app.use('/', Routes);
app.use('/', ClassRoutes);

// Define a porta do servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}/`);
});
