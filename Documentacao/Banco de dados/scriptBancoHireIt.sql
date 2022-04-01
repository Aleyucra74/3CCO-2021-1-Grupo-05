CREATE DATABASE IF NOT EXISTS bdHireIt;

USE bdHireIT;

DROP TABLE IF EXISTS softskill_demanda;
DROP TABLE IF EXISTS softskill_usuario;
DROP TABLE IF EXISTS Softskills;
DROP TABLE IF EXISTS tecnologia_demanda;
DROP TABLE IF EXISTS tecnologia_oferta;
DROP TABLE IF EXISTS Tecnologias;
DROP TABLE IF EXISTS Contratos;
DROP TABLE IF EXISTS Avaliacao_Oferta;
DROP TABLE IF EXISTS Avaliacao_Demanda;
DROP TABLE IF EXISTS Propostas;
DROP TABLE IF EXISTS Demandas;
DROP TABLE IF EXISTS Ofertas;
DROP TABLE IF EXISTS Usuarios;
DROP TABLE IF EXISTS Localizacoes;
DROP TABLE IF EXISTS Buscas;


CREATE TABLE IF NOT EXISTS Localizacoes(
	id_localizacao INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    cidade VARCHAR(45) NOT NULL,
    uf CHAR(2) NOT NULL,
    cep CHAR(8) NOT NULL
);

CREATE TABLE IF NOT EXISTS Usuarios(
	id_usuario INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL UNIQUE,
    senha VARCHAR(45) NOT NULL,
    descricao VARCHAR(300),
    classificacao DECIMAL(2,1) NOT NULL,
    telefone VARCHAR(9) NOT NULL,
    fk_localizacao INT,
    FOREIGN KEY (fk_localizacao) REFERENCES Localizacoes(id_localizacao) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Plataformas(
	id_plataforma int auto_increment primary key,
    nome varchar(55) not null
);

CREATE TABLE IF NOT EXISTS Contatos(
	id_contato int auto_increment primary key,
    link varchar(255) not null,
    path_variable varchar(255) not null,
    fk_usuario INT,
    fk_plataforma INT,
    FOREIGN KEY (fk_usuario) REFERENCES Usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (fk_plataforma) REFERENCES Plataformas(id_plataforma) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Ofertas(
	id_oferta INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    descricao VARCHAR(300) NOT NULL, 
	created_at DATETIME(3) default NOW(3),
    fk_usuario INT NOT NULL,
    FOREIGN KEY (fk_usuario) REFERENCES Usuarios(id_usuario) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Demandas(
	id_demanda INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(45) NOT NULL,
    descricao VARCHAR(300) NOT NULL,
	created_at DATETIME(3) default NOW(3),
    salario DECIMAL(8,2) NOT NULL,
    fk_usuario INT NOT NULL,
    FOREIGN KEY (fk_usuario) REFERENCES Usuarios(id_usuario)
);

CREATE TABLE IF NOT EXISTS Avaliacao_Oferta(
    id_avaliacao INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    descricao VARCHAR(300) NOT NULL,
    nota_softskill DECIMAL(2,1) NOT NULL,
    nota_tecnica DECIMAL(2,1) NOT NULL,
    data DATE NOT NULL,
    fk_oferta INT NOT NULL,
    FOREIGN KEY (fk_oferta) REFERENCES Ofertas(id_oferta)
);

CREATE TABLE IF NOT EXISTS Avaliacao_Demanda(
    id_avaliacao INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    descricao VARCHAR(300) NOT NULL,
    nota DECIMAL(2,1) NOT NULL,
    data DATE NOT NULL,
    fk_demanda INT NOT NULL,
    FOREIGN KEY (fk_demanda) REFERENCES Demandas(id_demanda)
);

CREATE TABLE IF NOT EXISTS Propostas(
	id_proposta INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    fk_oferta INT NOT NULL,
    FOREIGN KEY (fk_oferta) REFERENCES Ofertas(id_oferta),
    fk_demanda INT NOT NULL,
    FOREIGN KEY (fk_demanda) REFERENCES Demandas(id_demanda)
);

CREATE TABLE IF NOT EXISTS Contratos(
	id_contrato INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    valor_hora DECIMAL NOT NULL,
    fk_oferta INT NOT NULL,
    fk_demanda INT NOT NULL,
    FOREIGN KEY (fk_oferta) REFERENCES Ofertas(id_oferta),
    FOREIGN KEY (fk_demanda) REFERENCES Demandas(id_demanda)
);

CREATE TABLE IF NOT EXISTS Tecnologias(
	id_tecnologia INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    tecnologia VARCHAR(45) NOT NULL
);

CREATE TABLE IF NOT EXISTS tecnologia_oferta(
	id_tecnologia_oferta INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    tempo_experiencia INT NOT NULL,
    fk_tecnologia INT NOT NULL,
    fk_oferta INT NOT NULL,
    FOREIGN KEY (fk_tecnologia) REFERENCES Tecnologias(id_tecnologia),
    FOREIGN KEY (fk_oferta) REFERENCES Ofertas(id_oferta)
);

CREATE TABLE IF NOT EXISTS tecnologia_demanda(
	id_tecnologia_demanda INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    tempo_experiencia INT NOT NULL,
    fk_tecnologia INT NOT NULL,
    fk_demanda INT NOT NULL,
    FOREIGN KEY (fk_tecnologia) REFERENCES Tecnologias(id_tecnologia),
    FOREIGN KEY (fk_demanda) REFERENCES Demandas(id_demanda)
);

CREATE TABLE IF NOT EXISTS Softskills(
	id_softskill INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    softskills VARCHAR(45) NOT NULL
);

CREATE TABLE IF NOT EXISTS softskill_usuario(
	id_softskill_usuario INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nota_softskill INT,
    fk_softskill INT NOT NULL,
    fk_usuario INT NOT NULL,
    FOREIGN KEY (fk_softskill) REFERENCES Softskills(id_softskill),
    FOREIGN KEY (fk_usuario) REFERENCES Usuarios(id_usuario)
);

CREATE TABLE IF NOT EXISTS softskill_demanda(
	id_softskill_demanda INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nota_softskill INT,
    fk_softskill INT NOT NULL,
    fk_demanda INT NOT NULL,
    FOREIGN KEY (fk_softskill) REFERENCES Softskills(id_softskill),
    FOREIGN KEY (fk_demanda) REFERENCES Demandas(id_demanda)
);

CREATE TABLE IF NOT EXISTS Buscas(
	id int auto_increment primary key,
    tecnologia varchar(50) not null,
    quantidade int,
    tipo varchar(50)
);

CREATE TABLE IF NOT EXISTS Contatos(
	idContato
)

INSERT INTO Buscas VALUES 
(null, 'Java', 0,'Oferta'),
(null, 'Springboot', 0, 'Oferta'),
(null, 'MySQL', 0, 'Oferta'),
(null, 'SQL Server', 0, 'Oferta'),
(null, 'React', 0, 'Oferta'),
(null, 'Java', 0, 'Demanda'),
(null, 'Springboot', 0, 'Demanda'),
(null, 'MySQL', 0, 'Demanda'),
(null, 'SQL Server', 0, 'Demanda'),
(null, 'React', 0, 'Demanda');

INSERT INTO Localizacoes VALUES (null,'São Caetano do Sul','SP','09572550');

INSERT INTO Usuarios VALUES (null, 'Mateus Gomes', 'mateus@gmail.com', 'senha123', 'Desenvolvedor backend', 4.5, '912345678',1);

INSERT INTO Tecnologias VALUES 
(null, "Java"),
(null, "Springboot"),
(null, "MySQL"),
(null, "SQL Server"),
(null, "React");