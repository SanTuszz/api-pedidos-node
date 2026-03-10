const express = require("express");
const app = express();

app.use(express.json());

let orders = [];

// Criar pedido
app.post("/orders", (req, res) => {

    const data = req.body;

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

// Buscar pedido por ID
app.get("/orders/:id", (req, res) => {

    const order = orders.find(o => o.orderId === req.params.id);

    if (!order) {
        return res.status(404).json({
            message: "Pedido não encontrado"
        });
    }

    res.json(order);
});

// Listar pedidos
app.get("/orders", (req, res) => {
    res.json(orders);
});

// Atualizar pedido
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

// Deletar pedido
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