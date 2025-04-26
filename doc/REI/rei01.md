# C1 : Introdução

## Descrição do trabalho
A nossa proposta visa melhorar o funcionamento de uma Biblioteca Universitária, melhorando assim a forma como são geridas as quantidades de livros que lá existem, os empréstimos realizados, as devoluções, as reservas, as penalizações (atrasos, não devolução e estragos) e o registo dos utilizadores. Este sistema será desenvolvido com o objetivo de otimizar a organização e o acesso à informação, reduzir significativamente o tempo de atendimento e automatizar tarefas que hoje são feitas manualmente. Com a implementação desta solução, pretende-se não só melhorar o fluxo de trabalho dos funcionários da biblioteca, como também oferecer aos utilizadores uma experiência mais rápida, prática e eficiente.

Além disso, o sistema permitirá acompanhar em tempo real o estado dos livros, indicando claramente quais estão disponíveis, quais estão emprestados, quais estão reservados e quais estão danificados. Esta monitorização constante do inventário permitirá à biblioteca gerir de forma muito mais eficaz o seu acervo, evitando perdas, esquecimentos ou duplicação desnecessária de exemplares. Será igualmente possível identificar rapidamente as áreas do catálogo que precisam de reposição ou atualização.

Os funcionários terão acesso a uma plataforma de gestão mais intuitiva e poderosa, onde poderão registar novas aquisições, atualizar informações bibliográficas, registar empréstimos e devoluções, gerir penalizações e acompanhar reservas ativas. Este novo sistema de gestão permitirá também a geração de relatórios de atividade detalhados, essenciais para a análise de desempenho e para a tomada de decisões estratégicas sobre o futuro da biblioteca.

Para os utilizadores, a inovação será evidente: através de uma área privada acessível com autenticação segura, os alunos, professores e funcionários poderão consultar o catálogo de livros disponível, reservar exemplares, renovar empréstimos, verificar o histórico de transações e consultar eventuais penalizações em vigor. Além disso, o sistema contará com um sistema de notificações automatizadas por e-mail ou SMS, que alertará os utilizadores para prazos de devolução próximos, atrasos acumulados ou disponibilidade de livros reservados.

Outro ponto importante é a organização física dos livros. No sistema, cada exemplar estará associado à sua localização específica na biblioteca (corredor, estante e prateleira), o que facilitará imenso a procura tanto para utilizadores como para funcionários. Esta associação contribuirá para uma arrumação mais lógica e eficiente do espaço físico da biblioteca, tornando-a mais acessível e acolhedora para todos.

Com a crescente procura pelos serviços da biblioteca, torna-se cada vez mais necessário apostar na modernização dos processos internos e na digitalização da gestão do acervo. A nossa solução pretende responder a estas necessidades, promovendo um ambiente mais organizado, tecnológico e adaptado às exigências atuais da comunidade académica. Este projeto, ao focar-se tanto nas necessidades dos utilizadores como dos funcionários, garantirá uma melhoria global da experiência de utilização da Biblioteca Universitária, elevando o seu padrão de qualidade e eficiência.


## Modelação do problema

* Para a modelação do problema, foram assumidos os seguintes pressupostos:
* Cada utilizador pode efetuar múltiplos empréstimos e reservas.
* Um exemplar de livro pertence exclusivamente a um único livro.
* Cada exemplar pode ser emprestado várias vezes ao longo do tempo.
* Os livros são categorizados por género e têm informações associadas como autor, edição e ano de publicação.
* O registo de empréstimos inclui a data de início, a data de devolução prevista, a data de devolução real e o estado de renovação.
* É possível associar penalizações a empréstimos em caso de atraso, não devolução ou dano no exemplar, especificando o tipo e o motivo.
* Um exemplar danificado ou perdido pode originar penalizações específicas para o utilizador associado ao empréstimo.
* A comunicação com os utilizadores será feita através de notificações relativas a devoluções próximas, penalizações e disponibilização de reservas.
* O sistema deverá manter um histórico completo de todos os empréstimos, reservas e penalizações associadas a cada utilizador.
* Não deverá ser permitido efetuar dois empréstimos em simultâneo do mesmo exemplar para utilizadores diferentes.
  
---
[< Anterior](rei00.md) | [^ Principal](/../../) | [Seguinte >](rei02.md)
:--- | :---: | ---: 
