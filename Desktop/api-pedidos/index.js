const express = require("express");
const app = express();

app.use(express.json());

let orders = [];

// Criar pedido
app.post("/order", (req, res) => {

    const data = req.body;

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

// Buscar pedido
app.get("/order/:id", (req, res) => {

    const order = orders.find(o => o.orderId === req.params.id);

    if (!order) {
        return res.status(404).json({ message: "Pedido não encontrado" });
    }

    res.json(order);
});

// Listar pedidos
app.get("/order/list", (req, res) => {
    res.json(orders);
});

// Atualizar pedido
app.put("/order/:id", (req, res) => {

    const order = orders.find(o => o.orderId === req.params.id);

    if (!order) {
        return res.status(404).json({ message: "Pedido não encontrado" });
    }

    order.value = req.body.valorTotal;

    res.json(order);
});

// Deletar pedido
app.delete("/order/:id", (req, res) => {

    orders = orders.filter(o => o.orderId !== req.params.id);

    res.json({ message: "Pedido removido" });
});

app.listen(3000, () => {
    console.log("API rodando na porta 3000");
});