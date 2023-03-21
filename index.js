let express = require('express');
let app = express();
let http = require('http').Server(app);
let path = require('path');
let port = process.env.PORT || 3000;
let io = require('socket.io')(http);

//El servidor servira los ficheros situados en la carpeta public
app.use(express.static(path.join(__dirname, "public")));

app.get('*', function(req, res, next) {
    res.send("Hola");
});

//El servidor escucha en el puerto 3000
http.listen(port, () => {
    console.log('Abre el navegador en http://192.168.1.133:' + port);
});

//Escuchamos cada nueva conexion
io.on('connection', function(socket) {
    console.log('Nueva conexion');

    //Emitimos un evento hacia todos los participantes cada vez que se recibe una conexion
    io.emit('nuevo_miembro');

    //Escuchamos cada evento (de enviar mensajes)
    socket.on('mensaje_enviado', function(mensaje) {

        //Se emite evento para reenviar el mensaje a todos los participantes
        io.emit('mensaje_recibido', mensaje);
    });
});