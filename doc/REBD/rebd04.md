# DDL
```sql
USE biblioteca;

DROP TABLE IF EXISTS Penalizacao;
DROP TABLE IF EXISTS Reserva;
DROP TABLE IF EXISTS Emprestimo;
DROP TABLE IF EXISTS Localizacao;
DROP TABLE IF EXISTS Exemplar;
DROP TABLE IF EXISTS Livro;
DROP TABLE IF EXISTS Funcionario;
DROP TABLE IF EXISTS Utilizador;

CREATE TABLE IF NOT EXISTS Utilizador (
  numeroDeUtilizador INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  tipo ENUM('Aluno', 'Professor', 'Funcionário') NOT NULL,
  contacto VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Funcionario (
  codigoInterno INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  funcao VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Livro (
  codigoISBN CHAR(13) PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  autor VARCHAR(255) NOT NULL,
  anoDePublicacao INT CHECK (anoDePublicacao >= 1500),
  edicao VARCHAR(50) NOT NULL,
  genero VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Exemplar (
  codigoISBN CHAR(13) NOT NULL,
  numeroDeCopia INT NOT NULL,
  estado ENUM('Disponível', 'Emprestado', 'Danificado') DEFAULT 'Disponível',
  PRIMARY KEY (codigoISBN, numeroDeCopia),
  FOREIGN KEY (codigoISBN) REFERENCES Livro(codigoISBN)
);

CREATE TABLE IF NOT EXISTS Localizacao (
  codigoISBN CHAR(13) NOT NULL,
  numeroDeCopia INT NOT NULL,
  corredor VARCHAR(10) NOT NULL,
  estante VARCHAR(10) NOT NULL,
  prateleira VARCHAR(10) NOT NULL,
  PRIMARY KEY (codigoISBN, numeroDeCopia),
  FOREIGN KEY (codigoISBN, numeroDeCopia) REFERENCES Exemplar(codigoISBN, numeroDeCopia)
);

CREATE TABLE IF NOT EXISTS Emprestimo (
  codigo INT AUTO_INCREMENT PRIMARY KEY,
  dataDeInicio DATE NOT NULL,
  dataDeDevolucaoPrevista DATE NOT NULL,
  dataDeDevolucaoReal DATE,
  renovacao BOOLEAN DEFAULT FALSE,
  numeroDeUtilizador INT NOT NULL,
  codigoInterno INT NOT NULL,
  codigoISBN CHAR(13) NOT NULL,
  numeroDeCopia INT NOT NULL,
  FOREIGN KEY (numeroDeUtilizador) REFERENCES Utilizador(numeroDeUtilizador),
  FOREIGN KEY (codigoInterno) REFERENCES Funcionario(codigoInterno),
  FOREIGN KEY (codigoISBN, numeroDeCopia) REFERENCES Exemplar(codigoISBN, numeroDeCopia)
);

CREATE TABLE IF NOT EXISTS Reserva (
  codigo INT AUTO_INCREMENT PRIMARY KEY,
  data DATE NOT NULL,
  hora TIME NOT NULL,
  dataDeExpiracao DATE NOT NULL,
  numeroDeUtilizador INT NOT NULL,
  codigoISBN CHAR(13) NOT NULL,
  codigoInterno INT NOT NULL,
  FOREIGN KEY (numeroDeUtilizador) REFERENCES Utilizador(numeroDeUtilizador),
  FOREIGN KEY (codigoISBN) REFERENCES Livro(codigoISBN),
  FOREIGN KEY (codigoInterno) REFERENCES Funcionario(codigoInterno)
);

CREATE TABLE IF NOT EXISTS Penalizacao (
  codigoDePenalizacao INT AUTO_INCREMENT PRIMARY KEY,
  tipo ENUM('Multa', 'Suspensão', 'Bloqueio') NOT NULL,
  data DATE NOT NULL,
  motivo TEXT NOT NULL,
  codigoEmprestimo INT NOT NULL,
  FOREIGN KEY (codigoEmprestimo) REFERENCES Emprestimo(codigo)
);
# DML

INSERT INTO Utilizador (nome, tipo, contacto)
VALUES ('Joana Silva', 'Aluno', 'joana.silva@mail.com');


INSERT INTO Funcionario (nome, funcao)
VALUES ('Carlos Mendes', 'Bibliotecário');


INSERT INTO Livro (codigoISBN, titulo, autor, anoDePublicacao, edicao, genero)
VALUES ('9781234567897', 'A Máquina do Tempo', 'H.G. Wells', 1895, '1ª', 'Ficção Científica');


INSERT INTO Exemplar (codigoISBN, numeroDeCopia, estado)
VALUES ('9781234567897', 1, 'Disponível');


INSERT INTO Localizacao (codigoISBN, numeroDeCopia, corredor, estante, prateleira)
VALUES ('9781234567897', 1, 'B', '2', '3');


INSERT INTO Emprestimo (dataDeInicio, dataDeDevolucaoPrevista, numeroDeUtilizador, codigoInterno, codigoISBN, numeroDeCopia)
VALUES ('2025-05-26', '2025-06-02', 1, 1, '9781234567897', 1);

-- Inserir uma reserva
INSERT INTO Reserva (data, hora, dataDeExpiracao, numeroDeUtilizador, codigoISBN, codigoInterno)
VALUES ('2025-05-26', '10:00:00', '2025-06-01', 1, '9781234567897', 1);

-- Inserir uma penalização
INSERT INTO Penalizacao (tipo, data, motivo, codigoEmprestimo)
VALUES ('Multa', '2025-06-10', 'Atraso na devolução', 1);


