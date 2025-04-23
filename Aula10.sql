create database locadora;

use locadora;

create table filme(
	cod_filme INT(6) NOT NULL,
    nome varchar(80) NOT NULL,
    duracao INT(3) NULL,
    classificacao INT(2) NOT NULL,
    ano INT(4) NULL,
    cod_diretor INT(3) NULL,
    rno_copias INT(3) NOT NULL,
    CONSTRAINT pk_filme PRIMARY KEY (cod_filme)
);

CREATE TABLE diretor(
	cod_diretor INT(3) NOT NULL,
    nome VARCHAR(50) NOT NULL,
    CONSTRAINT pk_diretor PRIMARY KEY (cod_diretor)
);

INSERT INTO filme (cod_filme, nome, duracao, classificacao, ano, cod_diretor, rno_copias) VALUES
(1, 'O Poderoso Chefão', 175, 16, 1976, 1, 3),
(2, 'Pulp Function', 154, 18, 1994, 2, 5),
(3, 'Cidade de Deus', 130, 18, 2002, 3, 4),
(4, 'Senhor dos Aneis: A Sociedade do Anel', 178, 12, 2001, 4, 6);

INSERT INTO diretor (cod_diretor, nome) VALUES
(1, 'Francis Ford Coppola'),
(2, 'Quentin Tarantino'),
(3, 'Fernando Meirelles'),
(4, 'Peter Jackson');

SELECT * FROM filme;

SELECT * FROM diretor;

SELECT * FROM filme f join diretor d  on (f.cod_filme = d.cod_diretor);
