
const pedidoService = require('../services/pedido.service');

const controladorPedidos = {
    
    async obtenerPedidos(req, res) {
        try {
            const pedidos = await pedidoService.obtenerTodos();
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(pedidos));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Error al obtener los pedidos' }));
        }
    },

    async crearPedido(req, res) {
        let cuerpoPeticion = '';

        req.on('data', chunk => {
            cuerpoPeticion += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const datosNuevos = JSON.parse(cuerpoPeticion);

                const pedidoCreado = await pedidoService.crear(datosNuevos);

                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ 
                    mensaje: '¡Pedido creado con éxito!', 
                    pedido: pedidoCreado 
                }));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Formato JSON inválido o datos incompletos' }));
            }
        });
    }
};

module.exports = { controladorPedidos };