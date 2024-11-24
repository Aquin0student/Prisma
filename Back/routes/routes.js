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
router.get('/CriarPersonagem', (req, res) => {
    res.render('CriarPersonagem');  // Renderiza CriarPersonagem
});

router.get('/verificarSessao', (req, res) => {
    if (req.session.personagemId) {
        return res.status(200).json({
            personagemId: req.session.personagemId
        });
    } else {
        return res.status(404).json({
            error: 'Personagem não encontrado na sessão.' });
    }
});

// Rota para Página 2
router.get('/pagina2', (req, res) => {
    res.render('pagina2');  // Renderiza a página 2
});

module.exports = router;
