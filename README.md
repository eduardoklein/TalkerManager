# TalkerManager

TalkerManager é uma aplicação Node.js para gerenciar palestrantes ("talkers") com operações CRUD. Utiliza Express.js e segue os princípios de API RESTful.

## Funcionalidades

- Listar todos os palestrantes
- Buscar palestrantes por nome
- Obter palestrante por ID
- Adicionar novo palestrante
- Editar informações do palestrante
- Deletar palestrante
- Autenticação de usuário (login)

## Tecnologias

- Node.js
- Express.js
- JavaScript
- Arquivos JSON para armazenamento de dados

## Instalação

```bash
git clone https://github.com/seu-usuario/TalkerManager.git
cd TalkerManager
npm install
```

## Uso

Inicie o servidor:

```bash
npm start
```

A API estará disponível em `http://localhost:3000`.

## Endpoints da API

| Método | Endpoint       | Descrição                   |
| ------ | -------------- | --------------------------- |
| GET    | /talker        | Lista todos os palestrantes |
| GET    | /talker/search | Busca palestrantes por nome |
| GET    | /talker/:id    | Busca palestrante por ID    |
| POST   | /login         | Login do usuário            |
| POST   | /talker        | Adiciona novo palestrante   |
| PUT    | /talker/:id    | Edita palestrante           |
| DELETE | /talker/:id    | Deleta palestrante          |

## Autenticação

- Use `/login` para obter um token.
- O token é obrigatório para requisições POST, PUT e DELETE.

## Estrutura dos Dados

Os palestrantes são armazenados em `talker.json`:

```json
[
  {
    "id": 1,
    "name": "Nome Exemplo",
    "age": 30,
    "talk": {
      "watchedAt": "01/01/2022",
      "rate": 5
    }
  }
]
```
