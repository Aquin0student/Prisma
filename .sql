CREATE DATABASE IF NOT EXISTS dnd_bd;

USE dnd_bd;

CREATE TABLE IF NOT EXISTS class (
                                     index_name VARCHAR(255) UNIQUE,  -- Garante unicidade para o nome da classe
                                     level INT,
                                     proficiency_bonus INT,
                                     name VARCHAR(255),
                                     hit_die INT,
                                     multiclassing JSON,  -- Mantém como JSON
                                     starting_equipment JSON,
                                     starting_equipment_options JSON,
                                     proficiency_choices JSON,
                                     saving_throws JSON,
                                     subclasses JSON
);


CREATE TABLE spellcasting (
                              class_index VARCHAR(255) NOT NULL,  -- Relaciona com a tabela de classes
                              level INT,
                              ability_score VARCHAR(255),
                              spellcasting_details JSON,  -- Armazena detalhes como multiclassing, proficiency_choices, etc.
                              FOREIGN KEY (class_index) REFERENCES class(index_name)
);

/* Concluido Proficiencias existentes*/
create table IF NOT EXISTS proficiencies(
                                            index_name varchar(255) PRIMARY KEY,
                                            name varchar(255)
);

/* Concluido Relaçao entre a classe e as proficiencias que ela dá */
create table IF NOT EXISTS proficiencies_class(
                                                  class_index varchar(255),
                                                  proficiencies_index varchar(255),
                                                  foreign key (class_index) references class(index_name),
                                                  foreign key (proficiencies_index) references proficiencies(index_name),
                                                  primary key (class_index, proficiencies_index)
);

/* Concluido Poderes de uma classe*/
CREATE TABLE IF NOT EXISTS features (
                                        index_name VARCHAR(255) PRIMARY KEY,  -- Mantém o index_name como a chave primária
                                        name VARCHAR(255) NOT NULL,
                                        level INT,
                                        prerequisites JSON,  -- Melhora: transforma o campo em JSON para maior flexibilidade
                                        descricao JSON NOT NULL  -- Mantém a descrição como JSON para múltiplas línguas ou estrutura mais detalhada
);


/* Concluido relaçao entre a classe e os poderes que ela tem*/
create table IF NOT EXISTS features_class(
                                             class_index VARCHAR(255),
                                             feature_index VARCHAR(255),
                                             FOREIGN KEY (class_index) REFERENCES class(index_name),
                                             FOREIGN KEY (feature_index) REFERENCES features(index_name),
                                             PRIMARY KEY (class_index, feature_index)
);

/* Concluido Skills de forma geral (forca, int etc)*/
create table IF NOT EXISTS skills(
                                     index_name varchar(255) PRIMARY KEY ,
                                     name varchar(255),
                                     descricao JSON
);

/* Concluido Habilidades de forma geral (atletistmo etc)*/
create table IF NOT EXISTS ability_scores(
                                             index_name varchar(255) primary key,
                                             name varchar(255),
                                             full_name varchar(255),
                                             descricao JSON
);

/* Concluido Relação entre skills e ability_scores (for, int etc)*/
create table IF NOT EXISTS skill_ability_scores(
                                                   skill_index varchar(255),
                                                   ability_score_index varchar(255),
                                                   FOREIGN KEY (skill_index) REFERENCES skills(index_name),
                                                   FOREIGN KEY (ability_score_index) references ability_scores(index_name),
                                                   PRIMARY KEY (skill_index, ability_score_index)

);
/* Concluido - Tabela de racas*/
create table IF NOT EXISTS races(
                                    index_name varchar(255) primary key ,
                                    name varchar(255),
                                    speed int,                                     -- Velocidade da raca
                                    alignment TEXT,                                -- Alinhamento
                                    age TEXT,
                                    size varchar(20),
                                    size_description TEXT
);

/* Concluido - Relacao entre racas e o bonus de habilidades*/
CREATE TABLE IF NOT EXISTS races_ability_bonuses (
                                                     race_index VARCHAR(255) PRIMARY KEY,          -- Garante uma linha única por raça
                                                     ability_bonuses JSON,                         -- Lista de bônus de habilidades em JSON
                                                     FOREIGN KEY (race_index) REFERENCES races(index_name)
);

create table IF NOT EXISTS languages(
                                        index_name varchar(255) primary key,
                                        name varchar(255),
                                        type varchar(255)
);

-- Tabela de traits
CREATE TABLE IF NOT EXISTS traits (
                                      index_name VARCHAR(255) PRIMARY KEY,  -- Identificador único da trait
                                      name VARCHAR(255) NOT NULL,
                                      descricao JSON NOT NULL  -- Campo JSON para armazenar descrições detalhadas
);

-- Tabela de relacionamento entre races e traits
CREATE TABLE IF NOT EXISTS race_traits (
                                           race_index VARCHAR(255) PRIMARY KEY,          -- Uma linha única para cada raça
                                           traits JSON,                                  -- Campo JSON para armazenar todas as traits
                                           FOREIGN KEY (race_index) REFERENCES races(index_name)
);

CREATE TABLE IF NOT EXISTS spells (
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
# Tabela para o personagem criado pelo usuario

create table  personagem(
                            id int primary key auto_increment,
                            name varchar(255),
                            class_index varchar(255),
                            race_index varchar(255),
                            foreign key (class_index) references class(index_name),
                            foreign key (race_index) references races(index_name)

);

create table ability_personagem(
    index_personagem int,
    id int primary key auto_increment,
    cha int,
    dex int,
    `int` int,
    str int,
    wis int,
    con int,
    novo boolean default true,
    foreign key (index_personagem) references personagem(id)
);

SHOW TABLES LIKE 'races';
DESCRIBE races;

SELECT * FROM races;

# Tabela para a relação entre classe e as magias que ela possuiA
create table     class_spells(
                                 class_index varchar(255),
                                 spell_index varchar(255),
                                 FOREIGN KEY (class_index) REFERENCES class(index_name)
);

# Tabela para a relação entre a raça e as lingaguens que ela fala
CREATE TABLE IF NOT EXISTS race_languages (
                                              race_index VARCHAR(255) PRIMARY KEY,  -- Garante uma linha única por raça
                                              languages_index JSON,                 -- Armazena a lista de idiomas em JSON
                                              FOREIGN KEY (race_index) REFERENCES races(index_name)
);

CREATE TABLE IF NOT EXISTS subrace (
                                       index_name VARCHAR(255) PRIMARY KEY,
                                       name VARCHAR(255),
                                       description VARCHAR(255),
                                       starting_proficiencies JSON,
                                       language_options JSON
);


CREATE TABLE IF NOT EXISTS subrace_traits (
                                              subrace_index VARCHAR(255),
                                              traits JSON,
                                              FOREIGN KEY (subrace_index) REFERENCES subrace(index_name)
);




# SESSAO PARA RESETAR APOS TESTE
# RESETAR O ID DA TABELA PERSONAGEM PARA 1 (NAO DEVE TER NENHUM REGISTRO PARA FUNCIONAR
ALTER TABLE personagem AUTO_INCREMENT = 1;

