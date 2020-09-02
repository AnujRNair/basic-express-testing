const path = require('path');
const express = require('express');

const app = express();
const port = 3000;

app.use(
  express.static('public', {
    setHeaders: (res) => {
      res.set('Service-Worker-Allowed', '/');
    },
  })
);

app.get('/', (req, res) => {
  // res.send('Hello World!');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
