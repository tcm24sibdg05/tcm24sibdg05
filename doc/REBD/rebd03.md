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

**EMPRESTIMO**(dataDeInicio, codigo, dataDeDevolucaoPrevista, dataDeDevolucaoReal, renovacao)
- **DF5:** codigo → dataDeInicio, dataDeDevoluçãoPrevista, dataDeDevolucaoReal, renovacao, numeroDeUtilizador, codigoInterno, numeroDeCopia, codigoISBN
  
**RESERVA**(codigoDePenalizacao, tipo, data, motivo)
- **DF6:** codigo → data, hora, dataDeExpiracao
  
**PENALIZACAO**(codigo, data, hora, dataDeExpiracao)
- **DF7:** codigoDePenalizacao → tipo, data, motivo

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
-

### BCNF
-

---

| [< Previous](rebd02.md) | [^ Main](../../README.md) | [Next >](rebd04.md) |
|:----------------------------------:|:----------------------------------:|:----------------------------------:|

