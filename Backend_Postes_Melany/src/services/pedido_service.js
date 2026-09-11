const pedidoRepository = require('../repositories/pedido_repository');

const pedidoService = {
    
    async obtenerTodos() {
        const pedidos = await pedidoRepository.obtenerPedidos();
        return pedidos;
    },

    async crear(datosPedido) {
        if (!datosPedido.postre || !datosPedido.cantidad) {
            throw new Error('Faltan datos obligatorios: el postre y la cantidad son requeridos.');
        }

        const nuevoPedido = {
            id: Date.now(),
            postre: datosPedido.postre,
            cantidad: datosPedido.cantidad,
            fecha: new Date().toISOString()
        };
        const pedidoGuardado = await pedidoRepository.guardarPedido(nuevoPedido);
        
        return pedidoGuardado;
    }
};
module.exports = pedidoService;