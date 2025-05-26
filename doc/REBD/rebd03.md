# C3 : Normalização

---

## Relações derivadas do modelo EA

**Cliente**(id_cliente PK, nome, telefone, email)
- **DF1:** id_cliente → nome, telefone, email

**Veiculo**(id_veiculo PK, matricula, marca, modelo, ano, km, vin, #id_cliente → Cliente)
- **DF2:** id_veiculo → matricula, marca, modelo, ano, km, vin, id_cliente

**Servico**(id_servico PK, tipo_servico, preco)
- **DF3:** id_servico → tipo_servico, preco

**Agendamento**(id_agendamento PK, data, hora, status_confirmacao, #id_veiculo → Veiculo, #id_servico → Servico)
- **DF4:** id_agendamento → data, hora, status_confirmacao, id_veiculo, id_servico

**Historico**(id_historico PK, notas, #id_veiculo → Veiculo, #id_servico → Servico, #id_agendamento → Agendamento)
- **DF5:** id_historico → notas, id_agendamento, id_veiculo, id_servico

**Acao_Recomendada**(id_acao PK, descricao, data, status, #id_veiculo → Veiculo)
- **DF6:** id_acao → descricao, data, status, id_veiculo

---
