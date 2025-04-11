const Personagem = require("../Models/Personagem");
const Race = require("../Models/Race"); // Certifique-se de que o caminho está correto
const Class = require("../Models/Class")

async function criarPersonagem(req, res) {
    try {
        const { name } = req.body;

        // Cria o personagem
        const personagem = await Personagem.create({
            name
        });

        req.session.personagemId = personagem.id;

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
            return res.status(404).json({ error: 'Personagem não encontrado' + '.' });
        }
        const classe = await Class.findOne({where: {name: classe_index}})
        if(!classe){
            return res.status(404).json({error: 'Classe não encontrada.'})
        }
        personagem.class_index = classe.index_name;
        await personagem.save();
        res.status(200).json(personagem);
    }catch (error) {
        console.error('Erro ao adicionar classe ao personagem:', error);
        res.status(500).json({ error: 'Erro ao adicionar classe ao personagem.', message: error.message });
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

module.exports = { adicionarRacaAoPersonagem, criarPersonagem, adicionarClasseAoPersonagem};
