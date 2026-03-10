# 📦 API de Pedidos

![Node.js](https://img.shields.io/badge/Node.js-18-green)
![Express](https://img.shields.io/badge/Express-Framework-black)
![Swagger](https://img.shields.io/badge/Swagger-API%20Docs-brightgreen)
![Status](https://img.shields.io/badge/status-concluído-success)

API REST para gerenciamento de pedidos desenvolvida com Node.js e Express, com documentação interativa utilizando Swagger.

O projeto permite criar, consultar, atualizar e remover pedidos através de endpoints HTTP.

---

# 🚀 Tecnologias utilizadas

* Node.js
* Express
* Swagger (Documentação da API)
* JavaScript

---

# 📂 Estrutura do Projeto

```
api-pedidos-node
│
├── index.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

# ⚙️ Como executar o projeto

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/SanTuszz/api-pedidos-node.git
```

### 2️⃣ Acessar a pasta

```bash
cd api-pedidos-node
```

### 3️⃣ Instalar dependências

```bash
npm install
```

### 4️⃣ Rodar a aplicação

```bash
node index.js
```

---

# 📚 Documentação da API

Após iniciar o servidor, acesse:

```
http://localhost:3000/api-docs
```

A documentação interativa permite testar todas as rotas diretamente pelo navegador.

---

# 📌 Endpoints disponíveis

## Criar pedido

```
POST /orders
```

Exemplo de body:

```json
{
  "numeroPedido": "123",
  "valorTotal": 150,
  "dataCriacao": "2026-03-09",
  "items": [
    {
      "idItem": "1",
      "quantidadeItem": 2,
      "valorItem": 75
    }
  ]
}
```

---

## Listar pedidos

```
GET /orders
```

Retorna todos os pedidos cadastrados.

---

## Buscar pedido por ID

```
GET /orders/{id}
```

Exemplo:

```
GET /orders/123
```

---

## Atualizar pedido

```
PUT /orders/{id}
```

Exemplo:

```
PUT /orders/123
```

Body:

```json
{
  "valorTotal": 200
}
```

---

## Remover pedido

```
DELETE /orders/{id}
```

Exemplo:

```
DELETE /orders/123
```

---

# 🧪 Testando a API

A API pode ser testada utilizando:

* Swagger
* Postman
* Insomnia
* cURL

---

# 🧑‍💻 Autor

Douglas Santos

GitHub:
https://github.com/SanTuszz

---

# 📄 Licença

Este projeto foi desenvolvido para fins educacionais e testes técnicos.
