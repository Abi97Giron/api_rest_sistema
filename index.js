const express = require('express');
const app = express();

app.use(express.json());

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('¡Compilado!');
});

app.listen(PORT, () => {
    console.log(`Compilado en http://localhost:${PORT}`);
});