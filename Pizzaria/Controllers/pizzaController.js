const db = require('../BD');

exports.criarPizza = async (req, res) => {
  const { nome, ingredientes, imagem, preco } = req.body;
  try {
    await db.execute(
      'INSERT INTO pizzas (nome, ingredientes, imagem, preco) VALUES (?, ?, ?, ?)',
      [nome, ingredientes, imagem, preco]
    );
    res.status(201).json({ mensagem: 'Pizza cadastrada com sucesso.' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.listarPizzas = async (req, res) => {
  const [pizzas] = await db.execute('SELECT * FROM pizzas WHERE status = "ativo"');
  res.json(pizzas);
};

exports.atualizarPizza = async (req, res) => {
  const { id } = req.params;
  const { nome, ingredientes, imagem, preco, status } = req.body;
  try {
    await db.execute(
      'UPDATE pizzas SET nome = ?, ingredientes = ?, imagem = ?, preco = ?, status = ? WHERE id = ?',
      [nome, ingredientes, imagem, preco, status, id]
    );
    res.json({ mensagem: 'Pizza atualizada com sucesso.' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.desativarPizza = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute('UPDATE pizzas SET status = ? WHERE id = ?', ['inativo', id]);
    res.json({ mensagem: 'Pizza desativada com sucesso.' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
