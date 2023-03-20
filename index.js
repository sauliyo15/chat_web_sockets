let express = require('express');
let app = express();
let http = require('http').Server(app);
let path = require('path');
let port = process.env.PORT || 3000;

//El servidor servira los ficheros situados en la carpeta public
app.use(express.static(path.join(__dirname, "public")));

app.get('*', function(req, res, next) {
    res.send("Hola");
});

//El servidor escucha en el puerto 3000
http.listen(port, () => {
    console.log('Abre el navegador en http://localhost:' + port);
});