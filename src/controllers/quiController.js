const db = require('../db')
const path = require('path')
const fs = require('fs')
console.log("quiController.js")
var listIdQui=";"
 
exports.getAllQui = async (req, res) => {
  console.log("getAllQui")
  listIdQui=";"
  try {
    const { rows } = await db.query('SELECT * FROM qui  where genre = $1 and datenaiss > $2 ORDER BY datenaiss desc, fullname' , ['F','1959-12-31']);
    rows.forEach(qui => {
      listIdQui+=qui.id.toString().padStart(7, "0")+";";
    })
    console.log(listIdQui)
    res.json(rows);
  } catch (err) {
    console.log( err.message)
    res.status(500).json({ error: err.message });
  }
};

exports.getImgQuiById = async (req, res) => {
  console.log("getImgQuiById")
  const rep="../QuoiQuiTek-4D_Folders/QuoiQuiTek-4D_Data/Photos/";
  const num=req.params.id;
  const nomFic="i"+num.toString().padStart(7, "0")+".png";
  const nomComplet=rep+nomFic;
  var imgPath=path.resolve(nomComplet);
  if (fs.existsSync(imgPath)) {
  }
  else {
      imgPath=path.resolve("./public/img/ko.jpg")
  }
  fs.readFile(imgPath, function(err, data) {
  if (err) throw err // Fail if the file can't be read.
  res.writeHead(200, {'Content-Type': 'image/jpeg'})
  res.end(data) // Send the file data to the browser.
  })

};

exports.getQuiById = async (req, res) => {
  console.log("getQuiById")
  console.log(listIdQui)
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM qui WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Qui not found' });
    var row0=rows[0];
    const i =listIdQui.indexOf(';'+id.padStart(7, "0")+";")+9 //debut du suivant
console.log(id.padStart(7, "0")+";")
console.log(i)
    if (i > 0) {
      row0.idSuivant=listIdQui.substring(i,i+7);
console.log(listIdQui.substring(i,i+7))
    } else {
      row0.idSuivant="0";
console.log("0")
    }

    res.json(row0);
    //res.json(rows[0]);
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
