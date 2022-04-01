CREATE DATABASE bdHireIt;

use bdHireIt;

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
    descricao VARCHAR(300) NOT NULL,
    classificacao DECIMAL(2,1) NOT NULL,
    telefone VARCHAR(9) NOT NULL,
    fk_localizacao INT NOT NULL,
    FOREIGN KEY (fk_localizacao) REFERENCES Localizacoes(id_localizacao) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Ofertas(
	id_oferta INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    descricao VARCHAR(300) NOT NULL,
    created_at timeStamp default current_timestamp(),
    fk_usuario INT NOT NULL,
    FOREIGN KEY (fk_usuario) REFERENCES Usuarios(id_usuario) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Demandas(
	id_demanda INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(45) NOT NULL,
    descricao VARCHAR(300) NOT NULL,
    created_at timeStamp default current_timestamp(),
    fk_usuario INT NOT NULL,
    FOREIGN KEY (fk_usuario) REFERENCES Usuarios(id_usuario) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Contratos(
	id_contrato INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    valor_hora DECIMAL NOT NULL,
    fk_oferta INT NOT NULL,
    fk_demanda INT NOT NULL,
    FOREIGN KEY (fk_oferta) REFERENCES Ofertas(id_oferta) ON DELETE CASCADE,
    FOREIGN KEY (fk_demanda) REFERENCES Demandas(id_demanda) ON DELETE CASCADE
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
    FOREIGN KEY (fk_tecnologia) REFERENCES Tecnologias(id_tecnologia) ON DELETE CASCADE,
    FOREIGN KEY (fk_oferta) REFERENCES Ofertas(id_oferta) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tecnologia_demanda(
	id_tecnologia_demanda INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    tempo_experiencia INT NOT NULL,
    fk_tecnologia INT NOT NULL,
    fk_demanda INT NOT NULL,
    FOREIGN KEY (fk_tecnologia) REFERENCES Tecnologias(id_tecnologia) ON DELETE CASCADE,
    FOREIGN KEY (fk_demanda) REFERENCES Demandas(id_demanda) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Softskills(
	id_softskill INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    softskills VARCHAR(45) NOT NULL
);

CREATE TABLE IF NOT EXISTS softskill_oferta(
	id_softskill_oferta INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    fk_softskill INT NOT NULL,
    fk_oferta INT NOT NULL,
    FOREIGN KEY (fk_softskill) REFERENCES Softskills(id_softskill) ON DELETE CASCADE,
    FOREIGN KEY (fk_oferta) REFERENCES Ofertas(id_oferta) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS softskill_demanda(
	id_softskill_demanda INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    fk_softskill INT NOT NULL,
    fk_demanda INT NOT NULL,
    FOREIGN KEY (fk_softskill) REFERENCES Softskills(id_softskill) ON DELETE CASCADE,
    FOREIGN KEY (fk_demanda) REFERENCES Demandas(id_demanda) ON DELETE CASCADE
);