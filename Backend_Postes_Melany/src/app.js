const http = require('http');
const { manejarRutasPedidos } = require('./routes/pedido_routes');

const PORT = 3000;

const server = http.createServer((req, res) => {    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    manejarRutasPedidos(req, res);
});

server.listen(PORT, () => {
    console.log(` Servidor nativo corriendo en http://localhost:${PORT}/api/pedidos`);
});