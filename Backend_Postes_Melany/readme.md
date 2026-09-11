#  Backend - Sistema de Pedidos de Postres

Este repositorio contiene el backend desarrollado para la gestión de pedidos de un sistema de postres, implementando una arquitectura robusta de **cuatro capas** utilizando **Node.js nativo**.

##  Arquitectura del Software

El proyecto sigue estrictamente el patrón de separación de responsabilidades en cuatro capas para garantizar un código modular, mantenible y escalable:

1. **Rutas (`/src/routes`)**: Configuran los endpoints HTTP y direccionan las peticiones hacia el controlador correspondiente.
2. **Controladores (`/src/controllers`)**: Manejan la lógica de recepción de peticiones (`req`) y envío de respuestas (`res`), validando códigos de estado HTTP.
3. **Servicios (`/src/services`)**: Contienen la lógica de negocio principal y las validaciones de los datos antes de ser procesados.
4. **Repositories (`/src/repositories`)**: Gestionan la persistencia de datos interactuando directamente con el sistema de archivos (almacenamiento en JSON).

---

## 📁 Estructura del Proyecto

```text
Backend_Postes_Melany/
│
├── src/
│   ├── controllers/
│   │   └── pedido_controller.js
│   ├── data/
│   │   └── pedidos.json
│   ├── repositories/
│   │   └── pedido_repository.js
│   ├── routes/
│   │   └── pedido_routes.js
│   ├── services/
│   │   └── pedido_service.js
│   └── app.js
│
├── package.json
└── readme.md

1. La Puerta de Entrada (app.js y Rutas)
¿Qué hace? Es el punto de partida. El archivo principal (app.js) enciende el servidor con Node.js nativo y deja el puerto (como el 3000) escuchando.

Las Rutas (pedido_routes.js): Funcionan como el recepcionista o el mapa de tránsito. Cuando llega una petición a la URL /api/pedidos, la ruta dice: "Ah, esto es un pedido, se lo voy a mandar al controlador encargado de los pedidos".

2. El Controlador (pedido_controller.js)
¿Qué hace? Es el que da la cara y maneja la comunicación HTTP.

Recibe los datos que mandas desde Postman (el req.body), se los pasa al servicio para que los procese, y luego espera la respuesta para devolvérsela al cliente en formato JSON con su respectivo código de estado (como un 200 OK o un 201 Created). El controlador no calcula reglas ni lee archivos, solo gestiona el "entrante y saliente" de la petición.

3. El Servicio (pedido_service.js)
¿Qué hace? Es el cerebro o la capa de lógica de negocio.

Aquí es donde se evalúan las reglas del sistema (por ejemplo, validar que el postre no vaya sin nombre, que la cantidad sea mayor a cero, etc.). Una vez el servicio comprueba que todo está legal y correcto, le ordena al repositorio que guarde la información.

4. El Repositorio (pedido_repository.js y pedidos.json)
¿Qué hace? Es el encargado de hablar directamente con la persistencia (la "base de datos").

Como este proyecto usa Node nativo sin bases de datos pesadas, el repositorio se encarga de abrir el archivo src/data/pedidos.json, leer lo que hay dentro, agregar el nuevo pedido al array, y volver a escribir el archivo en el disco duro de la computadora.