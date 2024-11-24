const express = require('express');
const router = express.Router();
const AbilityController = require('../Controllers/AbilityController')

router.post('/atribuirPontos', AbilityController.atribuirPontos)

module.exports = router;