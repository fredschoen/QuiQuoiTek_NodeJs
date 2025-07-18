const express = require('express');
const bodyParser = require('body-parser');
const quisRouter = require('./routes/quis');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/quis', quisRouter);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
