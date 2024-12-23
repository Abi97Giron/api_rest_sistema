exports.crearCliente = async (req, res) => {
    try {
        const { razon_social, nombre_comercial, direccion_entrega, telefono, email } = req.body;

        const pool = await poolPromise;
        const result = await pool.request()
            .input('razon_social', razon_social)
            .input('nombre_comercial', nombre_comercial)
            .input('direccion_entrega', direccion_entrega)
            .input('telefono', telefono)
            .input('email', email)
            .query(`
                INSERT INTO Clientes (razon_social, nombre_comercial, direccion_entrega, telefono, email)
                VALUES (@razon_social, @nombre_comercial, @direccion_entrega, @telefono, @email)
            `);

        res.status(201).json({ message: 'Cliente creado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.actualizarCliente = async (req, res) => {
    try {
        const { id } = req.params; // El ID del cliente que quieres actualizar
        const { razon_social, nombre_comercial, direccion_entrega, telefono, email } = req.body;

        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', id) // El ID del cliente a actualizar
            .input('razon_social', razon_social)
            .input('nombre_comercial', nombre_comercial)
            .input('direccion_entrega', direccion_entrega)
            .input('telefono', telefono)
            .input('email', email)
            .query(`
                UPDATE Clientes
                SET razon_social = @razon_social, 
                    nombre_comercial = @nombre_comercial, 
                    direccion_entrega = @direccion_entrega, 
                    telefono = @telefono, 
                    email = @email
                WHERE idClientes = @id
            `);

        // Verificamos si se actualizó la fila
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        res.status(200).json({ message: 'Cliente actualizado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
