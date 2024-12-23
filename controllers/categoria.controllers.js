exports.crearCategoria = async (req, res) => {
    try {
        const { nombre, usuarios_idusuarios, estados_idestados } = req.body;
        const fecha_creacion = new Date(); // Puedes asignar la fecha de creación de manera automática

        const pool = await poolPromise;
        const result = await pool.request()
            .input('nombre', nombre)
            .input('usuarios_idusuarios', usuarios_idusuarios)
            .input('estados_idestados', estados_idestados)
            .input('fecha_creacion', fecha_creacion)
            .query(`
                INSERT INTO CategoriaProductos (Nombre, usuarios_idusuarios, estados_idestados, fecha_creacion)
                VALUES (@nombre, @usuarios_idusuarios, @estados_idestados, @fecha_creacion)
            `);
        res.status(201).json({ message: 'Categoría creada exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.actualizarCategoria = async (req, res) => {
    try {
        const { id } = req.params; // El ID de la categoría que se quiere actualizar
        const { nombre, usuarios_idusuarios, estados_idestados } = req.body;

        const pool = await poolPromise;
        
        // Actualiza los campos de la tabla CategoriaProductos
        const result = await pool.request()
            .input('id', id) // ID de la categoría que queremos actualizar
            .input('nombre', nombre) // Nuevo nombre de la categoría
            .input('usuarios_idusuarios', usuarios_idusuarios) // ID de usuario asociado
            .input('estados_idestados', estados_idestados) // ID de estado asociado
            .query(`
                UPDATE CategoriaProductos
                SET Nombre = @nombre, 
                    usuarios_idusuarios = @usuarios_idusuarios, 
                    estados_idestados = @estados_idestados
                WHERE idCategoriaProductos = @id
            `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        res.status(200).json({ message: 'Categoría actualizada exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
