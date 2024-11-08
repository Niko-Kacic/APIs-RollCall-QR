const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;


app.use(cors());

//Aqui creo la ruta para obtener la información de la API
app.get('/news', (req, res)=>{
    //Aqui se lee el archivo JSON creado con las noticias 
    fs.readFile('newsData.json','utf8',(err, data)=>{
        if(err) {
            return res.status(500).json({
                message: 'No se encontro ninguna noticia'
            });
        }

        //Se devuelve la noticia en formato JSON
        res.json(JSON.parse(data));
    });
    
});


//Aqui donde se configura para iniciar el servidor
app.listen(PORT, ()=> {
    console.log(`The server is running on http://localhost:${PORT}`);
});