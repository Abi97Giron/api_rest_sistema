exports.crearOrdenDetalles = async (req, res) => {
    try {
        const { clienteId, total, productos } = req.body; 
        const pool = await poolPromise;

        const result = await pool.request()
            .input('clienteId', clienteId)
            .input('total', total)
            .query(`
                INSERT INTO Ordenes (ClienteId, Total)
                OUTPUT INSERTED.idOrden  -- Esto nos devuelve el id de la orden creada
                VALUES (@clienteId, @total)
            `);

        const ordenId = result.recordset[0].idOrden; 

        const detallePromises = productos.map(async (producto) => {
            return pool.request()
                .input('ordenId', ordenId)
                .input('productoId', producto.productoId)
                .input('cantidad', producto.cantidad)
                .input('precio', producto.precio)
                .input('subtotal', producto.subtotal)
                .query(`
                    INSERT INTO OrdenDetalles (Orden_idOrden, Productos_idProductos, Cantidad, Precio, Subtotal)
                    VALUES (@ordenId, @productoId, @cantidad, @precio, @subtotal)
                `);
        });

        await Promise.all(detallePromises);

        res.status(201).json({ message: 'Orden y detalles creados exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

