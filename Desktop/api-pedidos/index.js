const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();

app.use(express.json());

let orders = [];

// CONFIGURAÇÃO DO SWAGGER
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Pedidos",
      version: "1.0.0",
      description: "API para gerenciamento de pedidos"
    }
  },
  apis: ["./index.js"]
};

const specs = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Criar um novo pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numeroPedido:
 *                 type: string
 *                 example: "123"
 *               valorTotal:
 *                 type: number
 *                 example: 150
 *               dataCriacao:
 *                 type: string
 *                 example: "2026-03-09"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     idItem:
 *                       type: string
 *                       example: "1"
 *                     quantidadeItem:
 *                       type: number
 *                       example: 2
 *                     valorItem:
 *                       type: number
 *                       example: 75
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 */
app.post("/orders", (req, res) => {

  const data = req.body || {};

  if (!data.numeroPedido || !data.valorTotal || !data.items) {
    return res.status(400).json({
      message: "Dados do pedido inválidos"
    });
  }

  const order = {
    orderId: data.numeroPedido,
    value: data.valorTotal,
    creationDate: data.dataCriacao,
    items: data.items.map(item => ({
      productId: Number(item.idItem),
      quantity: item.quantidadeItem,
      price: item.valorItem
    }))
  };

  orders.push(order);

  res.status(201).json(order);
});

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Listar todos os pedidos
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */
app.get("/orders", (req, res) => {
  res.json(orders);
});

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Buscar pedido por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido não encontrado
 */
app.get("/orders/:id", (req, res) => {

  const order = orders.find(o => o.orderId === req.params.id);

  if (!order) {
    return res.status(404).json({
      message: "Pedido não encontrado"
    });
  }

  res.json(order);
});

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Atualizar pedido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido atualizado
 *       404:
 *         description: Pedido não encontrado
 */
app.put("/orders/:id", (req, res) => {

  const order = orders.find(o => o.orderId === req.params.id);

  if (!order) {
    return res.status(404).json({
      message: "Pedido não encontrado"
    });
  }

  order.value = req.body.valorTotal;

  res.json(order);
});

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Remover pedido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido removido
 *       404:
 *         description: Pedido não encontrado
 */
app.delete("/orders/:id", (req, res) => {

  const index = orders.findIndex(o => o.orderId === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      message: "Pedido não encontrado"
    });
  }

  orders.splice(index, 1);

  res.json({
    message: "Pedido removido"
  });
});

app.listen(3000, () => {
  console.log("API rodando na porta 3000");
});