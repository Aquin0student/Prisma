const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../config/db');  // Importa a conexão com o banco
const router = express.Router();





// Rota para página de login
router.get('/login', (req, res) => {
    res.render('login');
});

// Rota de autenticação do login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
            if (err) throw err;

            if (results.length > 0) {
                bcrypt.compare(password, results[0].password, (err, match) => {
                    if (match) {
                        req.session.loggedin = true;
                        req.session.username = username;
                        res.redirect('/home');
                    } else {
                        res.send('Senha incorreta!');
                    }
                });
            } else {
                res.send('Usuário não encontrado!');
            }
        });
    } else {
        res.send('Por favor, insira um nome de usuário e senha!');
    }
});

// Rota para registro de usuários
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) throw err;

            db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], (err, result) => {
                if (err) throw err;
                res.send('Usuário registrado com sucesso!');
            });
        });
    } else {
        res.send('Por favor, preencha todos os campos!');
    }
});

// Rota para a página inicial
router.get('/', (req, res) => {
    res.render('home');  // Redireciona para a página de login
});

module.exports = router;
