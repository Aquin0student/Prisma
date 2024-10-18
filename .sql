CREATE DATABASE IF NOT EXISTS dnd_bd;

USE dnd_bd;

CREATE TABLE class (
                       id INT PRIMARY KEY AUTO_INCREMENT,
                       index_name VARCHAR(255) UNIQUE,  -- Garante unicidade para o nome da classe
                       level INT,
                       proficiency_bonus INT,
                       name VARCHAR(255),
                       hit_die INT,
                       multiclassing JSON,  -- Mantém como JSON
                       spellcasting JSON,   -- Corrigido: nome estava incorreto
                       spellcasting_ability JSON,
                       starting_equipment JSON,
                       starting_equipment_options JSON,
                       proficiency_choices JSON,
                       saving_throws JSON,
                       subclasses JSON
);


/* Concluido Proficiencias existentes*/
create table proficiencies(
                              index_name varchar(255) PRIMARY KEY,
                              name varchar(255)
);

/* Concluido Relaçao entre a classe e as proficiencias que ela dá */
create table proficiencies_class(
                                    class_index varchar(255),
                                    proficiencies_index varchar(255),
                                    foreign key (class_index) references class(index_name),
                                    foreign key (proficiencies_index) references proficiencies(index_name),
                                    primary key (class_index, proficiencies_index)
);

/* Concluido Poderes de uma classe*/
CREATE TABLE features (
                          index_name VARCHAR(255) PRIMARY KEY,  -- Mantém o index_name como a chave primária
                          name VARCHAR(255) NOT NULL,
                          level INT,
                          prerequisites JSON,  -- Melhora: transforma o campo em JSON para maior flexibilidade
                          descricao JSON NOT NULL  -- Mantém a descrição como JSON para múltiplas línguas ou estrutura mais detalhada
);


/* Concluido relaçao entre a classe e os poderes que ela tem*/
create table features_class(
                               class_index VARCHAR(255),
                               feature_index VARCHAR(255),
                               FOREIGN KEY (class_index) REFERENCES class(index_name),
                               FOREIGN KEY (feature_index) REFERENCES features(index_name),
                               PRIMARY KEY (class_index, feature_index)
);

/* Concluido Skills de forma geral (forca, int etc)*/
create table skills(
                       index_name varchar(255) PRIMARY KEY ,
                       name varchar(255),
                       descricao JSON
);

/* Concluido Habilidades de forma geral (atletistmo etc)*/
create table ability_scores(
                               index_name varchar(255) primary key,
                               name varchar(255),
                               full_name varchar(255),
                               descricao JSON
);

/* Concluido Relação entre skills e ability_scores (for, int etc)*/
create table skill_ability_scores(
                                     skill_index varchar(255),
                                     ability_score_index varchar(255),
                                     FOREIGN KEY (skill_index) REFERENCES skills(index_name),
                                     FOREIGN KEY (ability_score_index) references ability_scores(index_name),
                                     PRIMARY KEY (skill_index, ability_score_index)

);
/* Concluido - Tabela de racas*/
create table races(
                      index_name varchar(255) primary key ,
                      name varchar(255),
                      speed int,                                     -- Velocidade da raca
                      alignment TEXT,                                -- Alinhamento
                      age TEXT,
                      size varchar(20),
                      size_description TEXT
);

/* Concluido - Relacao entre racas e o bonus de habilidades*/
create table races_ability_bonuses(
                                      race_index varchar(255),
                                      ability_score_index varchar(255),
                                      bonus int,
                                      ability_bonuses JSON,
                                      foreign key (race_index) references races(index_name),
                                      foreign key (ability_score_index) references ability_scores(index_name),
                                      primary key (race_index)
);

create table languages(
                          index_name varchar(255) primary key,
                          name varchar(255),
                          type varchar(255)
);

-- Tabela de traits
CREATE TABLE traits (
                        index_name VARCHAR(255) PRIMARY KEY,  -- Identificador único da trait
                        name VARCHAR(255) NOT NULL,
                        descricao JSON NOT NULL  -- Campo JSON para armazenar descrições detalhadas
);

-- Tabela de relacionamento entre races e traits
CREATE TABLE race_traits (
                             race_index VARCHAR(255),
                             trait_index VARCHAR(255),
                             FOREIGN KEY (race_index) REFERENCES races(index_name),
                             FOREIGN KEY (trait_index) REFERENCES traits(index_name),
                             PRIMARY KEY (race_index, trait_index)
);

CREATE TABLE spells (
                        index_name VARCHAR(255) PRIMARY KEY,  -- Identificador único da magia
                        name VARCHAR(255) NOT NULL,           -- Nome da magia
                        `desc` TEXT NOT NULL,                   -- Descrição da magia
                        higher_level TEXT,                    -- Efeitos em níveis mais altos
                        `range` VARCHAR(50),                    -- Alcance da magia
                        components JSON NOT NULL,             -- Componentes (V, S, M)
                        level int,                            -- Nivel da magia
                        material TEXT,                        -- Componente material, se necessário
                        ritual BOOLEAN DEFAULT FALSE,         -- Se a magia pode ser usada como ritual
                        duration VARCHAR(50),                 -- Duração da magia
                        concentration BOOLEAN DEFAULT FALSE,  -- Se requer concentração
                        casting_time VARCHAR(50),             -- Tempo de conjuração
                        attack_type VARCHAR(50),              -- Tipo de ataque (se aplicável)
                        damage JSON,                          -- Estrutura de dano da magia
                        school VARCHAR(255),                  -- Escola de magia
                        classes JSON NOT NULL,                -- Classes que podem aprender a magia
                        subclasses JSON                       -- Subclasses que podem aprender a magia
);

create table personagem(
                           id int primary key auto_increment,
                           name varchar(255),
                           class_index varchar(255),
                           race_index varchar(255),
                           foreign key (class_index) references class(index_name),
                           foreign key (race_index) references races(index_name)

);

# A sequencia abaixo é um teste para validar se esta funcionando a insercao de valores. Para criar um personagem
# é preciso ter uma class e uma race (considerando que no momento dessa mensagem, personagem so possui esses dois dados
# INSERT INTO personagem (name, class_index, race_index)
# VALUES ('Pipo o Hilário', 'bard', 'human');
#
# INSERT INTO class (index_name, name, level, ability_score_bonuses, proficiency_bonus, hit_die)
# VALUES ('bard', 'Bard', 1, 0, 2, 8);
#
# INSERT INTO races (index_name, name, speed, alignment, age, size, size_description)
# VALUES ('human', 'Human', 30, 'Neutral', 'Mature by age 18', 'Medium', 'Humans are versatile.');

# Tabela para a relação entre a raça e as lingaguens que ela fala
create table race_languages(
                               languages_index varchar(255),
                               race_index varchar(255),
                               foreign key (race_index) references races(index_name),
                               foreign key (languages_index) references languages(index_name),
                               primary key (race_index, languages_index)
);



# SESSAO PARA INSERIR DADOS NAS TABELAS BASICAS (ABILITY_SCORES ETC)
INSERT INTO ability_scores (index_name, name, full_name, descricao)
VALUES
    ('str', 'Strength', 'Strength', '{"en": "Strength represents physical power."}'),
    ('dex', 'Dexterity', 'Dexterity', '{"en": "Dexterity represents agility and reflexes."}'),
    ('con', 'Constitution', 'Constitution', '{"en": "Constitution represents endurance."}'),
    ('int', 'Intelligence', 'Intelligence', '{"en": "Intelligence represents reasoning and memory."}'),
    ('wis', 'Wisdom', 'Wisdom', '{"en": "Wisdom represents perception and insight."}'),
    ('cha', 'Charisma', 'Charisma', '{"en": "Charisma represents force of personality."}');





