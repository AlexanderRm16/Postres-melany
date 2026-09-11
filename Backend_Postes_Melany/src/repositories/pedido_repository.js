const fs = require('fs/promises');
const path = require('path');
const rutaArchivo = path.join(__dirname, '../data/pedidos.json');

const pedidoRepository = {

    async obtenerPedidos() {
        try {
            const contenido = await fs.readFile(rutaArchivo, 'utf8');
            return JSON.parse(contenido);
        } catch (error) {
            if (error.code === 'ENOENT') {
                await this.guardarTodos([]);
                return [];
            }
            throw new Error('Error al leer la base de datos de pedidos');
        }
    },
    async guardarTodos(pedidos) {
        await fs.writeFile(rutaArchivo, JSON.stringify(pedidos, null, 2), 'utf8');
    },

    async guardarPedido(nuevoPedido) {
        const pedidos = await this.obtenerPedidos();
        pedidos.push(nuevoPedido);
        await this.guardarTodos(pedidos);
        return nuevoPedido;
    }
};

module.exports = pedidoRepository;