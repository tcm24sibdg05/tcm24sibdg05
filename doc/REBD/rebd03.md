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
