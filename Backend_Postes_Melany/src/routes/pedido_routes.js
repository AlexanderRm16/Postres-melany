const { controladorPedidos } = require('../controllers/pedido.controller');

const manejarRutasPedidos = (req, res) => {

    const urlParseada = new URL(req.url, `http://${req.headers.host}`);
    const ruta = urlParseada.pathname;
    const metodo = req.method;

    if (ruta === '/api/pedidos' && metodo === 'GET') {
        controladorPedidos.obtenerPedidos(req, res);

    } else if (ruta === '/api/pedidos' && metodo === 'POST') {
        controladorPedidos.crearPedido(req, res);
        
    } else {
   
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
    }
};

module.exports = { manejarRutasPedidos };