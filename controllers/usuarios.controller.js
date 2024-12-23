const bcrypt = require('bcryptjs');
exports.crearUsuario = async (req, res) => {
    try {
        const { 
            nombre_completo, 
            correo_electronico, 
            password, 
            telefono, 
            fecha_nacimiento, 
            rol_idrol, 
            estados_idestados, 
            Clientes_idClientes 
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10); 

        const pool = await poolPromise;
        await pool.request()
            .input('nombre_completo', nombre_completo)
            .input('correo_electronico', correo_electronico)
            .input('password', hashedPassword)
            .input('telefono', telefono)
            .input('fecha_nacimiento', fecha_nacimiento)
            .input('rol_idrol', rol_idrol)
            .input('estados_idestados', estados_idestados)
            .input('Clientes_idClientes', Clientes_idClientes)
            .query(`
                INSERT INTO Usuarios 
                    (NombreCompleto, CorreoElectronico, Password, Telefono, FechaNacimiento, Rol_idRol, Estados_idEstados, Clientes_idClientes)
                VALUES 
                    (@nombre_completo, @correo_electronico, @password, @telefono, @fecha_nacimiento, @rol_idrol, @estados_idestados, @Clientes_idClientes)
            `);
        
        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            nombre_completo, 
            correo_electronico, 
            password, 
            telefono, 
            fecha_nacimiento, 
            rol_idrol, 
            estados_idestados, 
            Clientes_idClientes 
        } = req.body;

        const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', id)  
            .input('nombre_completo', nombre_completo)
            .input('correo_electronico', correo_electronico)
            .input('password', hashedPassword)
            .input('telefono', telefono)
            .input('fecha_nacimiento', fecha_nacimiento)
            .input('rol_idrol', rol_idrol)
            .input('estados_idestados', estados_idestados)
            .input('Clientes_idClientes', Clientes_idClientes)
            .query(`
                UPDATE Usuarios
                SET 
                    NombreCompleto = @nombre_completo, 
                    CorreoElectronico = @correo_electronico, 
                    Telefono = @telefono, 
                    FechaNacimiento = @fecha_nacimiento,
                    Rol_idRol = @rol_idrol, 
                    Estados_idEstados = @estados_idestados, 
                    Clientes_idClientes = @Clientes_idClientes,
                    Password = COALESCE(@password, Password)  -- Si no se pasa nueva contraseña, no la actualiza
                WHERE idUsuarios = @id  -- Usamos idUsuarios
            `);

        res.status(200).json({ message: 'Usuario actualizado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
