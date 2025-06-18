# C3 : Normalização

---

## Relações derivadas do modelo EA

**LIVRO**(titulo, autor, codigoISBN, anoDePublicacao, edicao, genero)
- **DF1:** codigoISBN →  titulo, autor, anoDePublicacao, edicao, genero

**EXEMPLAR**(numeroDeCopia, codigoISBN, estado)
- **DF2:** (codigoISBN, numeroDeCopia) → estado

**UTILIZADOR**(numeroDeUtilizador, nome, tipo, contacto)
- **DF3:** numeroDeUtilizador →  nome, tipo, contacto

**FUNCIONARIO**(nome, codigoInterno, funcao)
- **DF4:** codigoInterno →  nome, funcao

**EMPRESTIMO**(dataDeInicio, codigoEsmprestimo, dataDeDevolucaoPrevista, dataDeDevolucaoReal, renovacao)
- **DF5:** codigoEmprestimo → dataDeInicio, dataDeDevoluçãoPrevista, dataDeDevolucaoReal, renovacao, numeroDeUtilizador, codigoInterno, numeroDeCopia, codigoISBN
  
**RESERVA**(codigo, tipo, data, motivo)
- **DF6:** codigo → data, hora, dataDeExpiracao
  
**PENALIZACAO**(codigo, data, hora, dataDeExpiracao)
- **DF7:** codigo → tipo, data, motivo

---

## Normalização do Esquema Relacional

### NF1 - Primeira Forma Normal
- Todas as relações estão em NF1.

### NF2 - Segunda Forma Normal
No modelo apresentado:

- Todas as tabelas possuem uma chave primária simples, com exceção da tabela EXEMPLAR, cuja chave é composta por (codigoISBN, numeroDeCopia).
- Na tabela EXEMPLAR, o atributo estado depende da totalidade da chave composta, e não apenas de uma parte dela.
- Ou seja, não existem dependências parciais em nenhuma das tabelas.

Todas as relações estão em NF2. 

### NF3 - Terceira Forma Normal
No modelo apresentado:

- Em todas as tabelas, os atributos não-chave dependem diretamente da chave primária.
- Não existem atributos não-chave que determinem outros atributos não-chave.
- Ou seja, não existem dependências transitivas em nenhuma das relações.

Todas as relações estão em NF3.

### BCNF - Forma Normal de Boyce-Codd
No modelo apresentado:

- Todas as dependências funcionais têm como determinante a chave primária ou chave candidata de cada tabela.
- Não existem dependências funcionais onde um atributo que não seja uma chave candidata determine outros atributos.
- Ou seja, todas as relações respeitam a condição da BCNF .

Todas as relações estão em BCNF.

---

| [< Previous](RPF02.md) | [^ Main](../../README.md) | [Next >](RPF04.md) |
|:----------------------------------:|:----------------------------------:|:----------------------------------:|
