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
| codigo | Código do empréstimo | INT, PRIMARY KEY, AUTO_INCREMENT                    | -            | Sim         | Não  |
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

Sanções aplicadas aos utilizadores..

| Nome        | Descrição                       | Domínio                                             | Por Omissão | Automático | Nulo |
|-------------|----------------------------------|------------------------------------------------------|--------------|-------------|---|
| codigoDePenalizacao | Código da penalização | INT, PRIMARY KEY, AUTO_INCREMENT   | -            | Sim         | Não  |
| tipo   | Tipo de penalização |ENUM('Multa', 'Suspensão', 'Bloqueio')   | -            | Não   | Não  |
| data | Data da penalização  | DATE NOT NULL                            | -            | Não | Não |
| motivo | Descrição do motivo  | TEXT NOT NULL | - | Não         | Não |
| codigoEmprestimo| Empréstimo relacionado | INT, FOREIGN KEY → Emprestimo(codigo) | -       | Não        Não  |


---

### Penalização

Sanções aplicadas aos utilizadores..

| Nome        | Descrição                       | Domínio                                             | Por Omissão | Automático | Nulo |
|-------------|----------------------------------|------------------------------------------------------|--------------|-------------|---|
|codigoInterno | Código único do funcionário | INT, PRIMARY KEY, AUTO_INCREMENT   | -            | Sim         | Não  |
| nome   | Nome do funcionário | VARCHAR(255) NOT NULL   | -            | Não   | Não  |
| funcao | Função (ex: Bibliotecário) | VARCHAR(100) NOT NULL | -            | Não | Não |
