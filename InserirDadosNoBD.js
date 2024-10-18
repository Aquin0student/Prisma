const axios = require('axios');
const mysql = require('mysql2/promise');
const {data} = require("express-session/session/cookie");
const db = require('/config/db');  // Importa a conexão com o banco

// Função principal para inserir a raça
// async function inserirRaca(index) {
//     try {
//
//         // Obter os dados da API
//         const racaResponse = await axios.get(`https://www.dnd5eapi.co/api/races/${index}`);
//         const racaData = racaResponse.data;
//
//         // Inserir os dados na tabela 'races'
//         await db.execute(
//             `INSERT INTO races (index_name, name, speed, alignment, age, size, size_description)
//              VALUES (?, ?, ?, ?, ?, ?, ?)`,
//             [
//                 racaData.index,
//                 racaData.name,
//                 racaData.speed,
//                 racaData.alignment,
//                 racaData.age,
//                 racaData.size,
//                 racaData.size_description
//             ]
//         );
//
//         // Montar um objeto JSON com os bônus de habilidade
//         const abilityBonuses = {};
//         for (const bonus of racaData.ability_bonuses) {
//             // // Garantir que a habilidade existe na tabela ability_scores
//             // await garantirAbilityScore(db, bonus.ability_score);
//
//             // Adicionar o bônus ao objeto JSON
//             abilityBonuses[bonus.ability_score.index] = bonus.bonus;
//         }
//
//         // Inserir o JSON de bônus de habilidade em uma única linha
//         await db.execute(
//             `INSERT INTO races_ability_bonuses (race_index, ability_bonuses)
//              VALUES (?, ?)`,
//             [
//                 racaData.index,
//                 JSON.stringify(abilityBonuses)
//             ]
//         );
//
//         console.log(`Raça '${racaData.name}' inserida com sucesso!`);
//         await db.end();  // Fechar conexão
//
//     } catch (error) {
//         console.error('Erro ao inserir a raça:', error);
//     }
// }
//
// // Função para verificar e inserir uma habilidade se ela não existir
// async function garantirAbilityScore(db, abilityScore) {
//     const [rows] = await db.execute('SELECT * FROM ability_scores WHERE index_name = ?', [abilityScore.index]);
//     if (rows.length === 0) {
//         await db.execute(
//             'INSERT INTO ability_scores (index_name, name, full_name, descricao) VALUES (?, ?, ?, ?)',
//             [
//                 abilityScore.index,
//                 abilityScore.name,
//                 abilityScore.name,
//                 JSON.stringify({ "en": `${abilityScore.name} description.` })
//             ]
//         );
//     }
// }


// async function inserirTodasAsLinguagens() {
//     try {
//
//
//         // Faz uma requisição à API para obter todas as linguagens
//         const response = await axios.get('https://www.dnd5eapi.co/api/languages');
//         const linguagens = response.data.results;  // Lista de linguagens com seus índices
//
//         // Itera sobre cada linguagem para buscar seus detalhes e inserir no banco de dados
//         for (const linguagem of linguagens) {
//             const languageResponse = await axios.get(`https://www.dnd5eapi.co/api/languages/${linguagem.index}`);
//             const languageData = languageResponse.data;
//
//             // Insere cada linguagem no banco de dados
//             await db.execute(
//                 `INSERT INTO languages (index_name, name, type)
//                 values (?, ?, ?)`,
//                 [
//                     languageData.index,
//                     languageData.name,
//                     languageData.type
//                 ]
//             );
//
//             console.log(`Linguagem '${languageData.name}' inserida com sucesso!`);
//         }
//
//         await db.end();  // Fechar conexão
//
//     } catch (error) {
//         console.error('Erro ao inserir as linguagens:', error);
//     }
// }

async function inserirTodasAsProficiencias() {
    try {
        // Faz uma requisição à API para obter todas as proficiências
        const response = await axios.get('https://www.dnd5eapi.co/api/proficiencies');
        const proficiencias = response.data.results;  // Lista de proficiências com seus índices

        // Itera sobre cada proficiência para buscar seus detalhes e inserir no banco de dados
        for (const proficiencia of proficiencias) {
            const profResponse = await axios.get(`https://www.dnd5eapi.co/api/proficiencies/${proficiencia.index}`);
            const profData = profResponse.data;

            // Insere cada proficiência no banco de dados
            await db.execute(
                `INSERT INTO proficiencies (index_name, name, type)
                values (?, ?, ?)`,
                [
                    profData.index,
                    profData.name,
                    profData.type
                ]
            );

            console.log(`Proficiencia '${profData.name}' inserida com sucesso!`);
        }

        await db.end();  // Fechar conexão

    } catch (error) {
        console.error('Erro ao inserir as proficiências:', error);
    }
}



// Testar inserção da raça "human"
// inserirRaca('human');
//inserirTodasAsLinguagens();
//inserirTodasAsProficiencias();