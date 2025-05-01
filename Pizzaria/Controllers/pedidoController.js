const db = require('../BD');

exports.criarPedido = async (req, res) => {
  const { cliente_id, itens, forma_pagamento } = req.body;

  try {
    let valor_total = 0;
    for (const item of itens) {
      const [pizza] = await db.execute('SELECT preco FROM pizzas WHERE id = ?', [item.pizza_id]);
      valor_total += pizza[0].preco * item.quantidade;
    }

    const [pedidoResult] = await db.execute(
      'INSERT INTO pedidos (cliente_id, forma_pagamento, valor_total) VALUES (?, ?, ?)',
      [cliente_id, forma_pagamento, valor_total]
    );
    const pedido_id = pedidoResult.insertId;

    for (const item of itens) {
      const [pizza] = await db.execute('SELECT preco FROM pizzas WHERE id = ?', [item.pizza_id]);
      await db.execute(
        'INSERT INTO itens_pedido (pedido_id, pizza_id, quantidade, preco_unitario) VALUES (?, ?, ?, ?)',
        [pedido_id, item.pizza_id, item.quantidade, pizza[0].preco]
      );
    }

    res.status(201).json({ mensagem: 'Pedido criado com sucesso.', pedido_id, valor_total });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.pedidosEmAtendimento = async (req, res) => {
  try {
    const [pedidos] = await db.execute(`
      SELECT p.id, c.nome AS cliente, p.valor_total, p.forma_pagamento, p.status, p.data_hora_pedido
      FROM pedidos p
      JOIN clientes c ON p.cliente_id = c.id
      WHERE p.status IN ('aguardando_pagamento', 'pago_em_preparacao')
    `);
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.pedidosEntregues = async (req, res) => {
  try {
    const [pedidos] = await db.execute(`
      SELECT p.id, c.nome AS cliente, p.valor_total, p.forma_pagamento, p.data_hora_pedido, p.data_hora_entrega
      FROM pedidos p
      JOIN clientes c ON p.cliente_id = c.id
      WHERE p.status = 'entregue'
    `);
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.historicoCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const [pedidos] = await db.execute(`
      SELECT p.id, p.valor_total, p.status, p.data_hora_pedido, p.data_hora_entrega
      FROM pedidos p
      WHERE p.cliente_id = ?
    `, [id]);
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
