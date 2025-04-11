const Class = require('../Models/Class');
const Personagem = require("../Models/Personagem"); // Certifique-se de que o caminho está correto

// Função para criar uma nova classe
async function criarClasse(req, res) {
    try {
        // Verifica se os dados obrigatórios estão no corpo da requisição
        const { index_name, level, proficiency_bonus, name, hit_die } = req.body;
 
        if (!index_name || !level || !proficiency_bonus || !name || !hit_die) {
            return res.status(400).json({ error: 'Faltam dados obrigatórios.' });
        }

        // Cria a nova classe no banco de dados usando os dados passados no corpo da requisição
        const novaClasse = await Class.create(req.body);
        res.status(201).json(novaClasse); // Retorna a classe criada com o status 201
    } catch (error) {
        console.error('Erro ao criar classe:', error); // Log completo do erro
        res.status(500).json({ error: 'Erro ao criar a classe.', message: error.message }); // Retorna erro com a mensagem detalhada
    }
}


// Função para consultar uma classe por nome
async function obterClassePorNome(req, res) {
    try {
        const indexName = req.params.indexName; // Pega o parâmetro da requisição
        const classe = await Class.findOne({
            where: { index_name: indexName } // Consulta no banco pela chave index_name
        });

        if (classe) {
            res.json(classe); // Retorna a classe encontrada
        } else {
            res.status(404).json({ error: 'Classe não encontrada.' }); // Retorna erro caso a classe não seja encontrada
        } 
    } catch (error) {
        console.error('Erro ao buscar classe:', error); // Log completo do erro
        res.status(500).json({ error: 'Erro ao buscar a classe.', message: error.message }); // Retorna erro com a mensagem detalhada
    }
}
 
module.exports = { criarClasse, obterClassePorNome };
