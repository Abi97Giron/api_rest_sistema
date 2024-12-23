exports.crearEstado = async (req, res) => {
    try {
        const { nombre } = req.body; 

        const pool = await poolPromise;
        const result = await pool.request()
            .input('nombre', nombre) 
            .query(`
                INSERT INTO Estados (nombre)
                VALUES (@nombre)
            `);

        res.status(201).json({ message: 'Estado creado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.actualizarEstado = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body; 

        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', id) 
            .input('nombre', nombre) 
            .query(`
                UPDATE Estados
                SET nombre = @nombre
                WHERE idestados = @id
            `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Estado no encontrado' });
        }

        res.status(200).json({ message: 'Estado actualizado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
