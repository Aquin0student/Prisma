const express = require('express');
const router = express.Router();

// // Verifica se o usuário está logado
// router.get('/home', (req, res) => {
//     if (req.session.loggedin) {
//         res.render('home', { username: req.session.username });
//     } else {
//         res.send('Por favor, faça login para ver esta página.');
//     }
// });

// Rota para Página 1
router.get('/pagina1', (req, res) => {
        res.render('pagina1');  // Renderiza a página 1
});

// Rota para Página 2
router.get('/pagina2', (req, res) => {
        res.render('pagina2');  // Renderiza a página 2
});

module.exports = router;
