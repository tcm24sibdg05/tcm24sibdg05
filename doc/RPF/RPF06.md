# C6 : Construção da API com LoopBack
---
## Escolhas de implementação
- Adição manual de relações ()belongsTo nos modelos e nos repositórios.
- Adição manual da pasta data com o db.json com os pedidos
---
## Problemas Enfrentados e Soluções
### Loopback belongsTo
**Problema**: Embora os modelos tenham sido criados corretamente a partir das tabelas existentes, os relacionamentos entre as entidades — como chaves estrangeiras — não foram refletidos como associações explícitas nos modelos. O loopback não nos gerou um relation @belongsTo().
**Solução**: Criar adição manual do belongsTo nos modelos e repositório.
### Entidade `Exemplares`
**Problema:** Na tabela exemplar, temos a chave primária composta por codigoISBN e numeroDeCopia. No entanto, o campo numeroDeCopia não deve se repetir em toda a tabela — ou seja, não pode haver exemplares com o mesmo numeroDeCopia, mesmo que tenham codigoISBN diferentes. Cada número de cópia deve ser único, independentemente do livro ao qual está associado.
**Solução**: Implementação do codigoISBN como chave primária também.
### MySQL host
**Problema**: O mySQL está sendo hosteado localmente, sendo difícil acesso em outra máquina.
**Solução**: Não encontramos solução.



