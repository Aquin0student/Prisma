const axios = require('axios');
const mysql = require('mysql2/promise');
const {data} = require("express-session/session/cookie");
const db = require('./Back/config/db.js');  // Importa a conexão com o banco


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

// async function inserirTraits() {
//     try {
//         // Obter a lista de traits da API
//         const response = await axios.get('https://www.dnd5eapi.co/api/traits');
//         const traits = response.data.results;
//
//         for (const trait of traits) {
//             // Para cada trait, obter detalhes
//             const traitResponse = await axios.get(`https://www.dnd5eapi.co/api/traits/${trait.index}`);
//             const traitData = traitResponse.data;
//
//             // Inserir a trait no banco de dados
//             await db.execute(
//                 `INSERT INTO traits (
//                     index_name, name, descricao
//                 ) VALUES (?, ?, ?)`,
//                 [
//                     traitData.index,
//                     traitData.name,
//                     JSON.stringify(traitData.desc || [])  // Descrição como JSON
//                 ]
//             );
//
//             console.log(`Trait '${traitData.name}' inserida com sucesso!`);
//         }
//
//         // Fechar conexão com o banco de dados
//         await db.end();
//     } catch (error) {
//         console.error('Erro ao inserir as traits:', error);
//     }
// }
//

// async function inserirRaces() {
//     try {
//         // Obter a lista de races da API
//         const response = await axios.get('https://www.dnd5eapi.co/api/races');
//         const races = response.data.results;
//
//         for (const race of races) {
//             // Para cada raça, buscar detalhes
//             const raceResponse = await axios.get(`https://www.dnd5eapi.co/api/races/${race.index}`);
//             const raceData = raceResponse.data;
//
//             // Inserir a raça no banco de dados
//             await db.execute(
//                 `INSERT INTO races (
//                     index_name, name, speed, alignment, age, size, size_description
//                 ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
//                 [
//                     raceData.index,
//                     raceData.name,
//                     raceData.speed,
//                     raceData.alignment,
//                     raceData.age,
//                     raceData.size,
//                     raceData.size_description
//                 ]
//             );
//
//             console.log(`Raça '${raceData.name}' inserida com sucesso!`);
//         }
//
//         // Fechar conexão com o banco de dados
//         await db.end();
//     } catch (error) {
//         console.error('Erro ao inserir as races:', error);
//     }
// }
//

// async function inserirRaceLanguages() {
//     try {
//         // Obter a lista de races da API
//         const response = await axios.get('https://www.dnd5eapi.co/api/races');
//         const races = response.data.results;
//
//         for (const race of races) {
//             // Para cada raça, buscar detalhes
//             const raceResponse = await axios.get(`https://www.dnd5eapi.co/api/races/${race.index}`);
//             const raceData = raceResponse.data;
//
//             // Coletar todos os idiomas que a raça conhece
//             const languages = raceData.languages.map(language => language.index);
//
//             // Inserir na tabela `race_languages` com todos os idiomas como um JSON
//             await db.execute(
//                 `INSERT INTO race_languages (race_index, languages_index)
//                 VALUES (?, ?)
//                 ON DUPLICATE KEY UPDATE languages_index = VALUES(languages_index)`,
//                 [
//                     raceData.index,
//                     JSON.stringify(languages)  // Converter a array de idiomas para JSON
//                 ]
//             );
//             console.log(`Idiomas ${JSON.stringify(languages)} inseridos para a raça '${raceData.index}'.`);
//         }
//
//         // Fechar conexão com o banco de dados
//         await db.end();
//     } catch (error) {
//         console.error('Erro ao inserir as linguagens das races:', error);
//     }
// }

// async function inserirAbilityBonuses() {
//     try {
//         // Obter a lista de races da API
//         const response = await axios.get('https://www.dnd5eapi.co/api/races');
//         const races = response.data.results;
//
//         for (const race of races) {
//             // Para cada raça, buscar detalhes
//             const raceResponse = await axios.get(`https://www.dnd5eapi.co/api/races/${race.index}`);
//             const raceData = raceResponse.data;
//
//             // Coletar todos os bônus de habilidade que a raça concede
//             const abilityBonuses = raceData.ability_bonuses.map(bonus => ({
//                 ability: bonus.ability_score.index,
//                 bonus: bonus.bonus
//             }));
//
//             // Inserir na tabela `races_ability_bonuses` com os bônus de habilidades como JSON
//             await db.execute(
//                 `INSERT INTO races_ability_bonuses (race_index, ability_bonuses)
//                 VALUES (?, ?)
//                 ON DUPLICATE KEY UPDATE ability_bonuses = VALUES(ability_bonuses)`,
//                 [
//                     raceData.index,
//                     JSON.stringify(abilityBonuses)  // Converter a lista de bônus para JSON
//                 ]
//             );
//             console.log(`Bônus de habilidade ${JSON.stringify(abilityBonuses)} inseridos para a raça '${raceData.index}'.`);
//         }
//
//         // Fechar conexão com o banco de dados
//         await db.end();
//     } catch (error) {
//         console.error('Erro ao inserir os bônus de habilidade das raças:', error);
//     }
// }

// async function inserirRaceTraits() {
//     try {
//         // Obter a lista de races da API
//         const response = await axios.get('https://www.dnd5eapi.co/api/races');
//         const races = response.data.results;
//
//         for (const race of races) {
//             // Para cada raça, buscar detalhes
//             const raceResponse = await axios.get(`https://www.dnd5eapi.co/api/races/${race.index}`);
//             const raceData = raceResponse.data;
//
//             // Coletar todas as traits que a raça possui
//             const traits = raceData.traits.map(trait => trait.index);
//
//             // Inserir na tabela `race_traits` com as traits como JSON
//             await db.execute(
//                 `INSERT INTO race_traits (race_index, traits)
//                 VALUES (?, ?)
//                 ON DUPLICATE KEY UPDATE traits = VALUES(traits)`,
//                 [
//                     raceData.index,
//                     JSON.stringify(traits)  // Converter a lista de traits para JSON
//                 ]
//             );
//             console.log(`Traits ${JSON.stringify(traits)} inseridas para a raça '${raceData.index}'.`);
//         }
//
//         // Fechar conexão com o banco de dados
//         await db.end();
//     } catch (error) {
//         console.error('Erro ao inserir as traits das raças:', error);
//     }
// }

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// async function inserirClasses() {
//     try {
//         // Obter a lista de classes da API
//         const response = await axios.get('https://www.dnd5eapi.co/api/classes');
//         const classes = response.data.results;
//
//         for (const classe of classes) {
//             // Para cada classe, buscar detalhes
//             const classResponse = await axios.get(`https://www.dnd5eapi.co/api/classes/${classe.index}`);
//             const classData = classResponse.data;
//
//             // Inserir a classe na tabela `class`
//             await db.execute(
//                 `INSERT INTO class (
//                     index_name, level, proficiency_bonus, name, hit_die,
//                     multiclassing, starting_equipment, starting_equipment_options,
//                     proficiency_choices, saving_throws, subclasses
//                 ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//                  ON DUPLICATE KEY UPDATE
//                                       level = VALUES(level),
//                                       proficiency_bonus = VALUES(proficiency_bonus),
//                                       hit_die = VALUES(hit_die),
//                                       multiclassing = VALUES(multiclassing),
//                                       starting_equipment = VALUES(starting_equipment),
//                                       starting_equipment_options = VALUES(starting_equipment_options),
//                                       proficiency_choices = VALUES(proficiency_choices),
//                                       saving_throws = VALUES(saving_throws),
//                                       subclasses = VALUES(subclasses);`,
//                 [
//                     classData.index,
//                     classData.level || 1,
//                     classData.prof_bonus || 2,
//                     classData.name,
//                     classData.hit_die || 8,
//                     JSON.stringify(classData.multiclassing || {}),
//                     JSON.stringify(classData.starting_equipment || []),
//                     JSON.stringify(classData.starting_equipment_options || []),
//                     JSON.stringify(classData.proficiency_choices || []),
//                     JSON.stringify(classData.saving_throws || []),
//                     JSON.stringify(classData.subclasses || [])
//                 ]
//             );
//             console.log(`Classe '${classData.name}' inserida com sucesso.`);
//
//             // Se a classe tiver informações de spellcasting, insira na nova tabela
//             if (classData.spellcasting) {
//                 const spellcasting = classData.spellcasting;
//                 const spellLevel = spellcasting.level || 0;
//                 const spellAbility = spellcasting.spellcasting_ability ? spellcasting.spellcasting_ability.name : 'Unknown'; // Corrigido para acessar `spellcasting_ability`
//
//                 await db.execute(
//                     `INSERT INTO spellcasting (
//                         class_index, level, ability_score, spellcasting_details
//                     ) VALUES (?, ?, ?, ?)
//                      ON DUPLICATE KEY UPDATE
//                                           level = VALUES(level),
//                                           ability_score = VALUES(ability_score),
//                                           spellcasting_details = VALUES(spellcasting_details);`,
//                     [
//                         classData.index,
//                         spellLevel,
//                         spellAbility, // Agora passando o nome correto da habilidade
//                         JSON.stringify(spellcasting)  // Armazena detalhes em JSON
//                     ]
//                 );
//                 console.log(`Spellcasting para a classe '${classData.name}' inserido com sucesso.`);
//             }
//
//             // Pausar por 500ms para evitar sobrecarregar a API
//             await sleep(500);
//         }
//
//         // Fechar conexão com o banco de dados
//         await db.end();
//     } catch (error) {
//         console.error('Erro ao inserir as classes:', error);
//     }
// }


async function deletarClasses() {
    try {

        await db.execute(`DELETE FROM class;`);
        console.log('Todas as classes foram deletadas com sucesso.');


    } catch (error) {
        console.error('Erro ao deletar classes:', error);
    } finally {

        await db.end();
    }
}

// async function inserirFeaturesPorClasse() {
//     try {
//         // Obter a lista de classes da API
//         const response = await axios.get('https://www.dnd5eapi.co/api/classes');
//         const classes = response.data.results;
//
//         for (const classe of classes) {
//             // Obter as features para a classe
//             const featuresResponse = await axios.get(`https://www.dnd5eapi.co/api/classes/${classe.index}/features`);
//             const features = featuresResponse.data.results;
//
//             // Inserir cada feature na tabela `features_class`
//             for (const feature of features) {
//                 await db.execute(
//                     `INSERT INTO features_class (class_index, feature_index)
//                     VALUES (?, ?)
//                     ON DUPLICATE KEY UPDATE feature_index = VALUES(feature_index)`,
//                     [classe.index, feature.index]
//                 );
//                 console.log(`Feature '${feature.name}' da classe '${classe.name}' inserida com sucesso.`);
//             }
//         }
//
//         // Fechar conexão com o banco de dados
//         await db.end();
//     } catch (error) {
//         console.error('Erro ao inserir as features das classes:', error);
//     }
// }

// Executar a função para inserir as features

// async function inserirProficienciasClasses() {
//     try {
//         // Obter a lista de classes da API
//         const response = await axios.get('https://www.dnd5eapi.co/api/classes');
//         const classes = response.data.results;
//
//         for (const classe of classes) {
//             // Para cada classe, buscar detalhes
//             const classResponse = await axios.get(`https://www.dnd5eapi.co/api/classes/${classe.index}`);
//             const classData = classResponse.data;
//
//             // Inserir as proficiências na tabela `proficiencies_class`
//             if (classData.proficiencies && classData.proficiencies.length > 0) {
//                 for (const proficiency of classData.proficiencies) {
//                     await db.execute(
//                         `INSERT INTO proficiencies_class (class_index, proficiencies_index)
//                         VALUES (?, ?)
//                         ON DUPLICATE KEY UPDATE proficiencies_index = VALUES(proficiencies_index);`,
//                         [
//                             classData.index,
//                             proficiency.index  // Certifique-se de que `proficiency.index` é a propriedade correta
//                         ]
//                     );
//                     console.log(`Proficiencia '${proficiency.name}' inserida para a classe '${classData.name}'.`);
//                 }
//             }
//         }
//
//         // Fechar conexão com o banco de dados
//         await db.end();
//     } catch (error) {
//         console.error('Erro ao inserir as proficiências das classes:', error);
//     }
// }



//deletarClasses();

async function inserirMagiasNasClasses(req, res) {

}


// A funcao abaixo faz duas coias: inserir classes e inserir a class na tabela
// spellcasting que se refere a classes que usam magia, contendo descricao
// e a ability_score necessaria para usar a magia
//inserirClasses();


// Testar inserção da raça "human"
// inserirRaca('human');

//inserirTodasAsLinguagens();
//inserirTodasAsProficiencias();
//inserirSkills();
//relacionarSkillsAbilityScores();
//inserirMagias();
//inserirFeatures();
// inserirTraits();
// inserirRaces();
// inserirRaceLanguages();
//inserirAbilityBonuses();
// inserirRaceTraits();
//inserirFeaturesPorClasse();
//inserirProficienciasClasses();