# 🏙️ API ZelaCidade 

## 📌 Sobre o projeto

A API **ZelaCidade** existe para registrar e gerenciar problemas urbanos como:
- Buracos
- Queda de energia
- Vazamentos
- Lixo acumulado
- Iluminação pública

Ela permite criar, visualizar, atualizar e deletar as ocorrências.

## 🛠️ Tecnologias utilizadas
- Node.js
- Express
- SQLite
- SQLite3
- Postman

--- 

## 📦 Instalação 
```bash
npm install
```

## ▶️ Como Executar
```bash
npm run dev
```
Servidor disponível em: http://localhost:3000

---

## 🗄️ Banco de Dados
```
database.db
```

### 🧾 Tabela

| Campo           |  Descrição                       |
|-----------------|----------------------------------|
| ID              | Identificador único              |
|tipo_problema    | Tipo do problema                 |
|localização      | Onde ocorreu                     |
|descricao        | Detalhes do incidente registrado |
|prioridade       | Baixa, Média ou Alta             |
|nome_solicitante |Quem registrou                    |
|data_registro    |Data que ocorreu o registro       |
|hora_registro    |Hora que ocorreu o registro       |
|status           |Status (padrão: Pendente)         |
|imagem_problema  |URL da imagem                     |

---
## 🔗 Endpoints

### Rota inicial

```
GET /
```
Retorna uma página HTML simples com informações da API

### Rota para listar todos os incidentes
```
GET /incidentes
```
Retorna todos os registros do banco de dados

### Rota para buscar um incidente por ID
```
GET /incidentes/:id
```
Exemplo:
```
/incidentes/1
```

## Rota para criar um novo incidente

```
POST /incidentes
```

#### Body (JSON):

```JSON
{
        
        "tipo_problema": "Queda de árvore",
        "localizacao": "Praça da Liberdade, 210",
        "descricao": "Árvore bloqueando pista de acesso ao hospital geral",
        "prioridade": "Alta",
        "data_registro": "22-03-2026",
        "hora_registro": "22:10",
        "imagem_problema": ""
    
}
```

## Rota para atualizar incidente

```http
PUT /incidentes/:id
```

## Rota para deletar incidente
```http
DELETE /incidentes/:id
```
Exemplo:
```
/incidentes/1
```

## 🔐 Segurança
A API utiliza `?` nas queries SQL:

```sql
WHERE id = ?
```
Com o objetivo de evitar SQL Injection

---
## 📚 Conceitos

- CRUD (Create, Read, Update e Delete)
- Rotas com Express
- Métodos/Verbos HTTP (GET. POST, PUT e DELETE)
- Banco de dados SQLite
- SQL básico
- Uso de `req.params` e `req.body`

## 🎯 Observações
- O banco de dados foi criado automaticamente
- Os dados iniciais são inseridos apenas se estiver vazio
- API testada pode ser testada com o Postman
- Projeto desenvolvido para fins educacionais para aprendizado do back-end com Node.js


<!-- ## Esses emojis é um padrão em praticamente TODO README:
## 🚀 Nome da API / Projeto
## 📌 Sobre o Projeto
## 🎯 Objetivo
##  Tecnologias
##  Instalação
## ⚙️ Configurações

## 💡Dicas / Melhorias
## 👩‍💻 Autor
---
## 📖 Descrição
## 🔧 Ferramentas
## 💻 Ambiente
## 📊 Dados
## 
## 📡 Requisições
## 📥 Entrada de dados
## 📤 Saída de dados
## 🚫 Bloqueios / proteção
## 🧠 Aprendizado
## 🎓 Educacional
## ⚠️ Atenção
## ❗Importante
## 🤝 Contribuição
## 📄 Licença -->