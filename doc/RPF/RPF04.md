# C4 : Esquema Relacional

---

## Tabelas

### Utilizador

Registo dos utilizadores da biblioteca: alunos, professores e funcionários.

| Nome        | Descrição               | Domínio                          | Por Omissão | Automático | Nulo |
|-------------|--------------------------|-----------------------------------|--------------|-------------|------|
| numeroDeUtilizador  | Identificador do utilizador | INT, PRIMARY KEY, AUTO_INCREMENT | -            | Sim         | Não  |
| nome        | Nome completo          | VARCHAR(255) NOT NULL            | -            | Não         | Não  | Não |
| tipo    |Tipo de utilizador       | ENUM('Aluno', 'Professor', 'Funcionário') | -            | Não         | Não  |
| contacto       | Email ou telefone do utilizador  |  VARCHAR(100) NOT NULL            | -            | Não         | Não  |

---

### Livro

Lista de livros disponíveis na biblioteca.

| Nome        | Descrição                       | Domínio                                             | Por Omissão | Automático | Nulo |
|-------------|----------------------------------|------------------------------------------------------|--------------|-------------|---|
|codigoISBN | Código ISBN do livro | CHAR(13), PRIMARY KEY                     | -            | Não         | Não  |
| titulo   | Título do livro | VARCHAR(255) NOT NULL                          | -            | Não         | Não  |
| autor | Nome do autor  | VARCHAR(255) NOT NULL                              | -            | Não         | Não  |
| anoDePublicacao      | Ano em que foi publicado  | INT CHECK (anoDePublicacao >= 1500) | - | Não         | Não |
| edicao | Edição do livro | VARCHAR(50) NOT NULL                                      | -            | Não         | Não  |
| genero | Género literário  | VARCHAR(100) NOT NULL                                        | -            | Não         | Não  |


---

### Exemplares

Cada cópia física de um livro.

| Nome        | Descrição               | Domínio                          | Por Omissão | Automático | Nulo |
|-------------|--------------------------|-----------------------------------|--------------|-------------|------|
| codigoISBN  | Código do livro  | CHAR(13), FOREIGN KEY → Livro(codigoISBN) | -            | Não| Não  |
| numeroDeCopia | Número do exemplar          | INT            | -            | Não         | Não  | Não |
| estado    |Estado do exemplar       | ENUM('Disponível', 'Emprestado', 'Danificado') | 'Disponível' | Não         | Não  |


---

### Localização

Localização física do exemplar na biblioteca.

| Nome        | Descrição                       | Domínio                                             | Por Omissão | Automático | Nulo |
|-------------|----------------------------------|------------------------------------------------------|--------------|-------------|---|
|codigoISBN | Código ISBN do livro | CHAR(13), PRIMARY KEY                     | -            | Não         | Não  |
| numeroDeCopia   | Número do exemplar | INT, FOREIGN KEY                          | -            | Não         | Não  |
| corredor | Corredor  | VARCHAR(10) NOT NULL                              | -            | Não         | Não  |
| estante      | Estante  | VARCHAR(10) NOT NULL | - | Não         | Não |
| prateleira | Prateleira | VARCHAR(10) NOT NULL                                      | -            | Não         | Não  |

---

### Empréstimo

Localização física do exemplar na biblioteca.

| Nome        | Descrição                       | Domínio                                             | Por Omissão | Automático | Nulo |
|-------------|----------------------------------|------------------------------------------------------|--------------|-------------|---|
| codigoEmprestimo | Código do empréstimo | INT, PRIMARY KEY, AUTO_INCREMENT                    | -            | Sim         | Não  |
| dataDeInicio   |Início do empréstimo | DATE NOT NULL                          | -            | Não         | Não  |
| dataDeDevolucaoPrevista | Data prevista para devolução  | DATE NOT NULL                              | -            | Não | Não |
| dataDeDevolucaoReal     | Data real da devolução (se existir)  | DATE | - | Não         | Não |
| renovacao| Foi renovado? | BOOLEAN DEFAULT FALSE | 'FALSE'       | Não         | Não  |
| numeroDeUtilizador | Utilizador que requisitou| INT, FOREIGN KEY → Utilizador(numeroDeUtilizador)| -     | Não   | Não  |
| codigoInterno   | Funcionário responsável | INT, FOREIGN KEY → Funcionario(codigoInterno)                         | -            | Não| Não  |
| codigoISBN| Livro emprestado  | CHAR(13), FOREIGN KEY → Livro(codigoISBN) | -            | Não         | Não  |
| numeroDeCopia    | Número da cópia  | INT | - | Não         | Não |

---

### Reserva

Reservas feitas pelos utilizadores para livros indisponíveis.

| Nome        | Descrição                       | Domínio                                             | Por Omissão | Automático | Nulo |
|-------------|----------------------------------|------------------------------------------------------|--------------|-------------|---|
| codigo | Código da reserva | INT, PRIMARY KEY, AUTO_INCREMENT                    | -            | Sim         | Não  |
| data   | Data da reserva | DATE NOT NULL                          | -            | Não         | Não  |
| hora | Hora da reserva  | TIME NOT NULL                            | -            | Não | Não |
| dataDeExpiracao | Data de validade da reserva  | DATE NOT NULL | - | Não         | Não |
| numeroDeUtilizador| Quem reservou | INT, FOREIGN KEY → Utilizador(numeroDeUtilizador) | -       | Não         | Não  |
| codigoISBN |Livro reservado| CHAR(13), FOREIGN KEY → Livro(codigoISBN) | -     | Não   | Não  |
| codigoInterno   | Funcionário responsável | INT, FOREIGN KEY → Funcionario(codigoInterno)                        | -            | Não| Não  |

---

### Penalização

Sanções aplicadas aos utilizadores.

| Nome        | Descrição                       | Domínio                                             | Por Omissão | Automático | Nulo |
|-------------|----------------------------------|------------------------------------------------------|--------------|-------------|---|
| codigo | Código da penalização | INT, PRIMARY KEY, AUTO_INCREMENT   | -            | Sim         | Não  |
| tipo   | Tipo de penalização |ENUM('Multa', 'Suspensão', 'Bloqueio')   | -            | Não   | Não  |
| data | Data da penalização  | DATE NOT NULL                            | -            | Não | Não |
| motivo | Descrição do motivo  | TEXT NOT NULL | - | Não         | Não |
| codigoEmprestimo| Empréstimo relacionado | INT, FOREIGN KEY → Emprestimo(codigo) | -       | Não | Não  |


---

### Funcionário

Registo dos funcionários da biblioteca.

| Nome        | Descrição                       | Domínio                                             | Por Omissão | Automático | Nulo |
|-------------|----------------------------------|------------------------------------------------------|--------------|-------------|---|
|codigoInterno | Código único do funcionário | INT, PRIMARY KEY, AUTO_INCREMENT   | -            | Sim         | Não  |
| nome   | Nome do funcionário | VARCHAR(255) NOT NULL   | -            | Não   | Não  |
| funcao | Função (ex: Bibliotecário) | VARCHAR(100) NOT NULL | -            | Não | Não |



## Vistas

---

## `emprestimos_ativos`

**Objetivo:** Consultar todos os empréstimos ativos (ainda não devolvidos), com dados do utilizador, livro e exemplar.

```sql
CREATE VIEW emprestimos_ativos AS
SELECT 
    e.codigo AS id_emprestimo,
    e.dataDeInicio,
    e.dataDeDevolucaoPrevista,
    u.nome AS nome_utilizador,
    l.titulo AS livro,
    ex.numeroDeCopia,
    ex.estado
FROM Emprestimo e
JOIN Utilizador u ON e.numeroDeUtilizador = u.numeroDeUtilizador
JOIN Livro l ON e.codigoISBN = l.codigoISBN
JOIN Exemplar ex ON e.codigoISBN = ex.codigoISBN AND e.numeroDeCopia = ex.numeroDeCopia
WHERE e.dataDeDevolucaoReal IS NULL;
```
---

## `emprestimos_ativos`

**Objetivo:** Consultar todos os empréstimos ativos (ainda não devolvidos), com dados do utilizador, livro e exemplar.

```sql
CREATE VIEW emprestimos_ativos AS
SELECT 
    e.codigo AS id_emprestimo,
    e.dataDeInicio,
    e.dataDeDevolucaoPrevista,
    u.nome AS nome_utilizador,
    l.titulo AS livro,
    ex.numeroDeCopia,
    ex.estado
FROM Emprestimo e
JOIN Utilizador u ON e.numeroDeUtilizador = u.numeroDeUtilizador
JOIN Livro l ON e.codigoISBN = l.codigoISBN
JOIN Exemplar ex ON e.codigoISBN = ex.codigoISBN AND e.numeroDeCopia = ex.numeroDeCopia
WHERE e.dataDeDevolucaoReal IS NULL;
```

---

## `reservas_pendentes`

**Objetivo:** Consultar todas as reservas ainda válidas (não expiradas), com nome do utilizador e título do livro.

```sql
CREATE VIEW reservas_pendentes AS
SELECT
    r.codigo AS id_reserva,
    r.data,
    r.hora,
    r.dataDeExpiracao,
    u.nome AS nome_utilizador,
    l.titulo AS livro
FROM Reserva r
JOIN Utilizador u ON r.numeroDeUtilizador = u.numeroDeUtilizador
JOIN Livro l ON r.codigoISBN = l.codigoISBN
WHERE r.dataDeExpiracao >= CURDATE();
```

---

## `historico_utilizador`

**Objetivo:** Ver o histórico completo de empréstimos e penalizações por utilizador.

```sql
CREATE VIEW historico_utilizador AS
SELECT 
    u.nome AS nome_utilizador,
    l.titulo AS livro,
    e.dataDeInicio,
    e.dataDeDevolucaoPrevista,
    e.dataDeDevolucaoReal,
    p.tipo AS tipo_penalizacao,
    p.motivo
FROM Utilizador u
JOIN Emprestimo e ON u.numeroDeUtilizador = e.numeroDeUtilizador
JOIN Livro l ON e.codigoISBN = l.codigoISBN
LEFT JOIN Penalizacao p ON e.codigo = p.codigoEmprestimo;
```

---

## `livros_danificados`

**Objetivo:** Consultar todos os exemplares danificados, com título e localização física.

```sql
CREATE VIEW livros_danificados AS
SELECT 
    l.titulo,
    ex.numeroDeCopia,
    loc.corredor,
    loc.estante,
    loc.prateleira
FROM Exemplar ex
JOIN Livro l ON ex.codigoISBN = l.codigoISBN
JOIN Localizacao loc ON ex.codigoISBN = loc.codigoISBN AND ex.numeroDeCopia = loc.numeroDeCopia
WHERE ex.estado = 'Danificado';
```
---

| [< Anterior](RPF03.md) | [^ Principal](../../README.md) | [Próximo >](RPF05.md) |
|:----------------------------------:|:----------------------------------:|:----------------------------------:|
