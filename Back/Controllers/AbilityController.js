const Personagem = require("../Models/Personagem"); 
const Ability = require("../Models/Ability");
const Race = require("../Models/Race");
const RacesAbilityBonuses = require("../Models/RacesAbilityBonuses");

async function atribuirPontos(req, res) {
    try {
        const { cha, con, dex, int, str, wis } = req.body; // Recebe os pontos do corpo da requisição
        const personagemId = req.session.personagemId; // ID do personagem na sessão

        console.log('personagemId na sessão:', personagemId);

        if (!personagemId) {
            return res.status(404).json({ error: 'Personagem não selecionado.' });
        }

        const personagem = await Personagem.findByPk(personagemId);
        console.log('Personagem encontrado:', personagem);


        if (!personagem) {
            return res.status(404).json({ error: 'Personagem não encontrado.' });
        }


        const race = await Personagem.findByPk(personagemId, {
            include: { model: Race, as: 'Race' }
        });
        console.log('Raça do personagem:', race.Race);

        if (!race) {
            return res.status(404).json({ error: 'Raça do personagem não encontrada.' });
        }


        if (!race.Race || !race.Race.index_name) {
            return res.status(404).json({ error: 'Raça do personagem não definida corretamente.' });
        }

        console.log('Index da raça do personagem:', race.Race.index_name);

        // Busca os bônus de habilidade da raça
        const raceBonuses = await RacesAbilityBonuses.findOne({
            where: { race_index: race.Race.index_name },
            attributes: ['ability_bonuses'] // Especifica apenas a coluna necessária
        });
        console.log('Bônus de habilidade da raça:', raceBonuses.dataValues.ability_bonuses);

        if (!raceBonuses || !raceBonuses.dataValues.ability_bonuses) {
            return res.status(404).json({ error: 'Bônus de habilidade da raça não encontrados.' });
        }

        // Extrai os bônus de habilidade do JSON
        const bonuses = raceBonuses.dataValues.ability_bonuses;
        console.log('Bônus de habilidade extraídos:', bonuses);


        let bonusCha = 0;
        let bonusCon = 0;
        let bonusDex = 0;
        let bonusInt = 0;
        let bonusStr = 0;
        let bonusWis = 0;
 
        // Adiciona os bônus de habilidade da raça aos atributos fornecidos
        for (const bonus of bonuses) {
            console.log(`Aplicando bônus: ${bonus.ability} + ${bonus.bonus}`);
            switch (bonus.ability) {
                case 'cha':
                    bonusCha += bonus.bonus;
                    break; 
                case 'con':
                    bonusCon += bonus.bonus;
                    break;
                case 'dex':
                    bonusDex += bonus.bonus;
                    break;
                case 'int':
                    bonusInt += bonus.bonus;
                    break;
                case 'str':
                    bonusStr += bonus.bonus;
                    break;
                case 'wis':
                    bonusWis += bonus.bonus; 
                    break;
                default:
                    break;
            }
        }


        if (![cha, con, dex, int, str, wis].every(val => Number.isInteger(val) && val >= 0)) {
            return res.status(400).json({ error: 'Os atributos devem ser números inteiros positivos.' });
        }


        const [ability, created] = await Ability.findOrCreate({
            where: { index_personagem: personagem.id },
            defaults: {
                cha: cha + bonusCha,
                con: con + bonusCon,
                dex: dex + bonusDex,
                int: int + bonusInt,
                str: str + bonusStr,
                wis: wis + bonusWis,
                novo: false
            }
        });

        if (!created) {
            await ability.update({ cha, con, dex, int, str, wis });
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
