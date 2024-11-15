const express = require('express');
const router = express.Router();
const ClasseController = require('../controllers/ClassController');
const PersonagemController = require('../controllers/PersonagemController');

// Rota para criar uma classe (POST /classes)
// router.post('/classes', ClasseController.criarClasse);

// router.get('/classes/:indexName', ClasseController.obterClassePorNome);

router.post('/personagens/criarPersonagem', PersonagemController.criarPersonagem);
router.post('/personagens/adicionar-raca', PersonagemController.adicionarRacaAoPersonagem);
router.post('/personagens/adicionarClasse', PersonagemController.adicionarClasseAoPersonagem);

module.exports = router;