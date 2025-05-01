const db = require('../BD');

exports.criarCliente = async (req, res) => {
  const { nome, telefone, endereco } = req.body;
  try {
    await db.execute('INSERT INTO clientes (nome, telefone, endereco) VALUES (?, ?, ?)', [nome, telefone, endereco]);
    res.status(201).json({ mensagem: 'Cliente criado com sucesso.' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.listarClientes = async (req, res) => {
  const [clientes] = await db.execute('SELECT * FROM clientes');
  res.json(clientes);
};

exports.buscarCliente = async (req, res) => {
  const { nome, telefone } = req.query;
  try {
    let query = 'SELECT * FROM clientes WHERE ';
    let param = '';
    if (nome) {
      query += 'nome LIKE ?';
      param = `%${nome}%`;
    } else if (telefone) {
      query += 'telefone LIKE ?';
      param = `%${telefone}%`;
    } else {
      return res.status(400).json({ erro: 'Informe nome ou telefone para busca.' });
    }
    const [result] = await db.execute(query, [param]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.atualizarCliente = async (req, res) => {
  const { id } = req.params;
  const { nome, telefone, endereco, status } = req.body;
  try {
    await db.execute(
      'UPDATE clientes SET nome = ?, telefone = ?, endereco = ?, status = ? WHERE id = ?',
      [nome, telefone, endereco, status, id]
    );
    res.json({ mensagem: 'Cliente atualizado com sucesso.' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.desativarCliente = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute('UPDATE clientes SET status = ? WHERE id = ?', ['inativo', id]);
    res.json({ mensagem: 'Cliente desativado.' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
