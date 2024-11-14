const Personagem = require("../Models/Personagem");
const Race = require("../Models/Race"); // Certifique-se de que o caminho está correto

async function criarPersonagem(req, res) {
    try {
        const { name } = req.body;

        // Cria o personagem
        const personagem = await Personagem.create({
            name
        });

        res.status(201).json(personagem); // Retorna o personagem criado
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar o personagem.' });
    }
}

async function adicionarClasseAoPersonagem(req, res) {
    try{
        const { personagemName, classe_index } = req.body;

        const personagem = await Personagem.findOne({where: {name: personagemName}});
        if(!personagem){
            return res.status(404).json({ error: 'Personagem não encontrado' +
                    '.' });
        }
    }
}

async function adicionarRacaAoPersonagem(req, res) {
    try {
        const { personagemName, raceName } = req.body;

        // Busca o personagem pelo nome
        const personagem = await Personagem.findOne({ where: { name: personagemName } });
        if (!personagem) {
            return res.status(404).json({ error: 'Personagem não encontrado.' });
        }

        // Busca a raça pelo nome
        const race = await Race.findOne({ where: { name: raceName } });
        if (!race) {
            return res.status(404).json({ error: 'Raça não encontrada.' });
        }

        // Atualiza o personagem com a raça encontrada
        personagem.race_index = race.index_name;
        await personagem.save();

        res.status(200).json(personagem); // Retorna o personagem atualizado
    } catch (error) {
        console.error('Erro ao adicionar raça ao personagem:', error);
        res.status(500).json({ error: 'Erro ao adicionar raça ao personagem.', message: error.message });
    }
}

module.exports = { adicionarRacaAoPersonagem, criarPersonagem};
