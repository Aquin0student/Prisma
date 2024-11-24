const Personagem = require("../Models/Personagem");
const Ability = require("../Models/Ability");

async function atribuirPontos(req, res) {
    try {
        const { cha, con, dex, int, str, wis } = req.body; // Recebe os pontos do corpo da requisição
        const personagemId = req.session.personagemId; // ID do personagem na sessão

        console.log('personagemId na sessão:', personagemId);

        // Verifica se o ID do personagem está na sessão
        if (!personagemId) {
            return res.status(404).json({ error: 'Personagem não selecionado.' });
        }

        // Busca o personagem pelo ID
        const personagem = await Personagem.findByPk(personagemId);

        // Verifica se o personagem existe
        if (!personagem) {
            return res.status(404).json({ error: 'Personagem não encontrado.' });
        }

        // Busca ou cria a habilidade associada ao personagem
        const [ability, created] = await Ability.findOrCreate({
            where: { index_personagem: personagem.id },
            defaults: { cha, con, dex, int, str, wis }
        });

        if (!created) {
            // Atualiza os atributos caso já exista
            await ability.update({ cha, con, dex, int, str, wis });
        }

        if (![cha, con, dex, int, str, wis].every(val => Number.isInteger(val) && val >= 0)) {
            return res.status(400).json({ error: 'Os atributos devem ser números inteiros positivos.' });
        }

        return res.status(200).json({
            message: created
                ? 'Pontos de habilidade criados com sucesso!'
                : 'Pontos de habilidade atualizados com sucesso!',
            ability
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Ocorreu um erro ao atribuir pontos de habilidade.' });
    }
}

module.exports = { atribuirPontos };