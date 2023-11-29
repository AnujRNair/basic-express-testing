const path = require('path');
const express = require('express');

const app = express();
const port = 3000;

app.use(express.static('public/dist'));

app.get('/', (req, res) => {
  // res.send('Hello World!');
  res.sendFile(path.join(__dirname, 'public', 'dist', 'index.html'));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`);
});
