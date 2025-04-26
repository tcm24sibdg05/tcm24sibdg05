# C2: Especificação de Requisitos

## Acesso e Funcionalidades no Sistema

As opções disponíveis no sistema de informação dependerão do **tipo de utilizador** que acede ao sistema e dos **perfis de permissões** associados a cada tipo de utilizador.

Assim, conforme o perfil, o utilizador poderá ter acesso às seguintes funcionalidades:

---

## Tipos de Utilizadores (Atores)

- **Aluno**
- **Professor**
- **Funcionário da Universidade**
- **Funcionário da Biblioteca** (perfil administrativo)

---

## Funcionalidades (Casos de Uso)

### 1. Aluno / Professor / Funcionário da Universidade
*(Perfil de utilizador geral)*

- Consultar o catálogo de livros disponíveis.
- Ver detalhes dos livros (autor, edição, ano de publicação, localização física, estado dos exemplares).
- Efetuar reservas de livros não disponíveis.
- Renovar empréstimos ativos (desde que não existam reservas pendentes sobre o exemplar).
- Consultar histórico de empréstimos e reservas anteriores.
- Consultar penalizações em vigor (atrasos, multas, suspensões).
- Receber notificações de:
  - Aproximação da data de devolução.
  - Disponibilidade de livros reservados.
  - Penalizações atribuídas.

### 2. Funcionário da Biblioteca
*(Perfil administrativo com permissões alargadas)*

- Inserir novos livros e respetivos exemplares no sistema.
- Atualizar dados bibliográficos de livros existentes.
- Registar empréstimos de exemplares aos utilizadores.
- Registar devoluções e atualizar o estado dos exemplares (disponível, danificado, perdido).
- Efetuar reservas manuais no sistema para utilizadores.
- Cancelar reservas expiradas ou inválidas.
- Registar penalizações por atrasos, danos ou não devoluções.
- Consultar e exportar relatórios de:
  - Empréstimos realizados.
  - Reservas efetuadas.
  - Penalizações aplicadas.
  - Estado geral dos exemplares.
- Criar, atualizar e remover contas de utilizadores.
- Gerir listas de espera para livros muito requisitados.
- Enviar comunicações manuais aos utilizadores (ex: avisos especiais).

---

**Notas:**
- O acesso dos utilizadores é feito através de login autenticado com número de utilizador e palavra-passe.
- O sistema garante que cada utilizador apenas tem acesso às funcionalidades que correspondem ao seu perfil.
- Funcionários da biblioteca têm um nível de acesso superior, essencial para a gestão e manutenção de todo o acervo.


