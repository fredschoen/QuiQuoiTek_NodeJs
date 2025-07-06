const express = require('express');
const bodyParser = require('body-parser');
const authorsRouter = require('./routes/authors');
const booksRouter = require('./routes/books');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/authors', authorsRouter);
app.use('/books', booksRouter);



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
