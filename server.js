const express = require('express');
const app = express();
const path = require('path');

app.use('/dist', express.static('dist'));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname,'index.html')));

app.listen(3001, () => console.log('app running on port 3001!'));