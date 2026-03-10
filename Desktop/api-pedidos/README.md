# API de Pedidos

API REST desenvolvida em Node.js utilizando Express para gerenciamento de pedidos.

## Tecnologias utilizadas

- Node.js
- Express

## Funcionalidades

- Criar pedido
- Listar pedidos
- Buscar pedido por ID
- Atualizar pedido
- Remover pedido

## Rotas da API

### Criar pedido
POST /orders

### Listar pedidos
GET /orders

### Buscar pedido por ID
GET /orders/:id

### Atualizar pedido
PUT /orders/:id

### Remover pedido
DELETE /orders/:id

## Como executar o projeto

1. Instale as dependências:

npm install

2. Execute o servidor:

node index.js

O servidor será iniciado na porta **3000**.