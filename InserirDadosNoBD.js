const axios = require('axios');
const mysql = require('mysql2/promise');
const {data} = require("express-session/session/cookie");
const db = require('./config/db.js');  // Importa a conexão com o banco

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

// async function inserirTodasAsProficiencias() {
//     try {
//         // Faz uma requisição à API para obter todas as proficiências
//         const response = await axios.get('https://www.dnd5eapi.co/api/proficiencies');
//         const proficiencias = response.data.results;  // Lista de proficiências com seus índices
//
//         // Itera sobre cada proficiência para buscar seus detalhes e inserir no banco de dados
//         for (const proficiencia of proficiencias) {
//             const profResponse = await axios.get(`https://www.dnd5eapi.co/api/proficiencies/${proficiencia.index}`);
//             const profData = profResponse.data;
//
//             // Insere cada proficiência no banco de dados
//             await db.execute(
//                 `INSERT INTO proficiencies (index_name, name, type)
//                 values (?, ?, ?)`,
//                 [
//                     profData.index,
//                     profData.name,
//                     profData.type
//                 ]
//             );
//
//             console.log(`Proficiencia '${profData.name}' inserida com sucesso!`);
//         }
//
//         await db.end();  // Fechar conexão
//
//     } catch (error) {
//         console.error('Erro ao inserir as proficiências:', error);
//     }
// }

// async function inserirSkills() {
//     try {
//         // Fazer a requisição para obter todas as skills
//         const response = await axios.get(`https://www.dnd5eapi.co/api/skills`);
//         const skills = response.data.results;
//
//         for (const skill of skills) {
//             // Fazer a requisição para obter os detalhes de cada skill
//             const skillResponse = await axios.get(`https://www.dnd5eapi.co/api/skills/${skill.index}`);
//             const skillData = skillResponse.data;
//
//             // Formatar a descrição como um JSON
//             let descricaoJson;
//             if (skillData.desc && skillData.desc.length > 0) {
//                 descricaoJson = JSON.stringify({ en: skillData.desc });
//             } else {
//                 descricaoJson = JSON.stringify({ en: `No description available for ${skillData.name}` });
//             }
//
//             // Inserir a skill no banco de dados
//             await db.execute(
//                 `INSERT INTO skills (index_name, name, descricao)
//                 VALUES (?, ?, ?)`,
//                 [
//                     skillData.index,
//                     skillData.name,
//                     descricaoJson
//                 ]
//             );
//             console.log(`Skill '${skillData.name}' inserida com sucesso!`);
//         }
//
//         // Fechar a conexão com o banco de dados após todas as inserções
//         await db.end();
//
//     } catch (error) {
//         console.error('Erro ao inserir as skills:', error);
//     }
// }

// async function relacionarSkillsAbilityScores() {
//     try {
//         // Obter a lista de skills
//         const response = await axios.get('https://www.dnd5eapi.co/api/skills');
//         const skills = response.data.results;
//
//         for (const skill of skills) {
//             // Para cada skill, obter detalhes
//             const skillResponse = await axios.get(`https://www.dnd5eapi.co/api/skills/${skill.index}`);
//             const skillData = skillResponse.data;
//
//             // Obter a ability score relacionada à skill (ex: Strength, Dexterity, etc.)
//             const abilityScoreIndex = skillData.ability_score.index;  // ex: 'str', 'dex', 'int'
//
//             // Inserir o relacionamento na tabela skill_ability_scores
//             await db.execute(
//                 `INSERT INTO skill_ability_scores (skill_index, ability_score_index)
//                  VALUES (?, ?)`,
//                 [skillData.index, abilityScoreIndex]
//             );
//
//             console.log(`Skill '${skillData.name}' relacionada à ability score '${abilityScoreIndex}' com sucesso!`);
//         }
//
//         // Fechar conexão com o banco de dados
//         await db.end();
//     } catch (error) {
//         console.error('Erro ao relacionar skills e ability scores:', error);
//     }
// }

// async function inserirMagias() {
//     try {
//         // Obter a lista de magias da API
//         const response = await axios.get('https://www.dnd5eapi.co/api/spells');
//         const spells = response.data.results;
//
//         for (const spell of spells) {
//             // Para cada magia, obter detalhes
//             const spellResponse = await axios.get(`https://www.dnd5eapi.co/api/spells/${spell.index}`);
//             const spellData = spellResponse.data;
//
//             // Inserir a magia no banco de dados
//             await db.execute(
//                 `INSERT INTO spells (
//                     index_name, name, \`desc\`, higher_level, \`range\`, components, level, material,
//                     ritual, duration, concentration, casting_time, attack_type, damage, school, classes, subclasses
//                 ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//                 [
//                     spellData.index,
//                     spellData.name,
//                     JSON.stringify(spellData.desc),                   // Descrição como JSON
//                     JSON.stringify(spellData.higher_level || []),     // Efeitos em níveis mais altos (se existir)
//                     spellData.range,
//                     JSON.stringify(spellData.components),             // Componentes como JSON (ex: ["V", "S", "M"])
//                     spellData.level,
//                     spellData.material || null,                       // Material (se existir)
//                     spellData.ritual || false,                        // Ritual como booleano
//                     spellData.duration,
//                     spellData.concentration || false,                 // Concentração como booleano
//                     spellData.casting_time,
//                     spellData.attack_type || null,                    // Tipo de ataque (se existir)
//                     JSON.stringify(spellData.damage || {}),           // Dano como JSON (se existir)
//                     spellData.school.index,                          // Escola de magia (index)
//                     JSON.stringify(spellData.classes || []),          // Classes como JSON
//                     JSON.stringify(spellData.subclasses || [])        // Subclasses como JSON
//                 ]
//             );
//
//             console.log(`Magia '${spellData.name}' inserida com sucesso!`);
//         }
//
//         // Fechar conexão com o banco de dados
//         await db.end();
//     } catch (error) {
//         console.error('Erro ao inserir as magias:', error);
//     }
// }

// async function inserirFeatures() {
//     try {
//         // Obter a lista de features da API
//         const response = await axios.get('https://www.dnd5eapi.co/api/features');
//         const features = response.data.results;
//
//         for (const feature of features) {
//             // Para cada feature, obter detalhes
//             const featureResponse = await axios.get(`https://www.dnd5eapi.co/api/features/${feature.index}`);
//             const featureData = featureResponse.data;
//
//             // Inserir a feature no banco de dados
//             await db.execute(
//                 `INSERT INTO features (
//                     index_name, name, level, prerequisites, descricao
//                 ) VALUES (?, ?, ?, ?, ?)`,
//                 [
//                     featureData.index,
//                     featureData.name,
//                     featureData.level,
//                     JSON.stringify(featureData.prerequisites || []),  // Pré-requisitos como JSON (se existir)
//                     JSON.stringify(featureData.desc || [])            // Descrição como JSON
//                 ]
//             );
//
//             console.log(`Feature '${featureData.name}' inserida com sucesso!`);
//         }
//
//         // Fechar conexão com o banco de dados
//         await db.end();
//     } catch (error) {
//         console.error('Erro ao inserir as features:', error);
//     }
// }


async function inserirTraits() {
    try {
        // Obter a lista de traits da API
        const response = await axios.get('https://www.dnd5eapi.co/api/traits');
        const traits = response.data.results;

        for (const trait of traits) {
            // Para cada trait, obter detalhes
            const traitResponse = await axios.get(`https://www.dnd5eapi.co/api/traits/${trait.index}`);
            const traitData = traitResponse.data;

            // Inserir a trait no banco de dados
            await db.execute(
                `INSERT INTO traits (
                    index_name, name, descricao
                ) VALUES (?, ?, ?)`,
                [
                    traitData.index,
                    traitData.name,
                    JSON.stringify(traitData.desc || [])  // Descrição como JSON
                ]
            );

            console.log(`Trait '${traitData.name}' inserida com sucesso!`);
        }

        // Fechar conexão com o banco de dados
        await db.end();
    } catch (error) {
        console.error('Erro ao inserir as traits:', error);
    }
}

inserirTraits();

// Testar inserção da raça "human"
// inserirRaca('human');


//inserirTodasAsLinguagens();
//inserirTodasAsProficiencias();
//inserirSkills();
//relacionarSkillsAbilityScores();
//inserirMagias();
//inserirFeatures();