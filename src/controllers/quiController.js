const db = require('../db');

exports.getAllQui = async (req, res) => {
  console.log("getAllQui")
  try {
    const { rows } = await db.query('SELECT * FROM qui  where genre = $1 and datenaiss > $2 ORDER BY datenaiss, fullname' , ['F','1959-12-31']);
    res.json(rows);
  } catch (err) {
    console.log( err.message)
    res.status(500).json({ error: err.message });
  }
};

exports.getQuiById = async (req, res) => {
  console.log("getQuiById")
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM qui WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Qui not found' });
    res.json(rows[0]);
  } catch (err) {
    console.log( err.message)
    res.status(500).json({ error: err.message });
  }
};

exports.createQui = async (req, res) => {
  console.log("createQui")
  try {
    const { name } = req.body;
    const { rows } = await db.query('INSERT INTO quis (name) VALUES ($1) RETURNING *', [name]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.log( err.message)
    res.status(500).json({ error: err.message });
  }
};

exports.updateQui = async (req, res) => {
  console.log("updateQui")
  try {
    const { id } = req.params;
    const { name } = req.body;
    const { rowCount } = await db.query('UPDATE quis SET name=$1 WHERE id=$2', [name, id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Qui not found' });
    res.json({ message: 'Qui updated' });
  } catch (err) {
    console.log( err.message)
    res.status(500).json({ error: err.message });
  }
};

exports.deleteQui = async (req, res) => {
  console.log("deleteQui")
  try {
    const { id } = req.params;
    const { rowCount } = await db.query('DELETE FROM quis WHERE id=$1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Qui not found' });
    res.json({ message: 'Qui deleted' });
  } catch (err) {
    console.log( err.message)
    res.status(500).json({ error: err.message });
  }
};
