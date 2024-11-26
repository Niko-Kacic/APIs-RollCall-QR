const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;


app.use(cors());

app.get('/courses', (req, res) => {

  fs.readFile('signatureData.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error al cargar los ramos' });
    }
    
    
    res.json(JSON.parse(data));
  });
});

app.use(express.json());


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
