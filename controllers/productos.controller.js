exports.crearProducto = async (req, res) => {
    try {
        const { 
            nombre, 
            marca, 
            codigo, 
            stock, 
            precio, 
            CategoriaProductos, 
            usuarios_idusuarios, 
            estados_idestados,
            foto
        } = req.body;

        const pool = await poolPromise;
        const result = await pool.request()
            .input('nombre', nombre)
            .input('marca', marca)
            .input('codigo', codigo)
            .input('stock', stock)
            .input('precio', precio)
            .input('CategoriaProductos', CategoriaProductos)  
            .input('usuarios_idusuarios', usuarios_idusuarios)  
            .input('estados_idestados', estados_idestados)  
            .input('foto', foto)  
            .query(`
                INSERT INTO Productos 
                    (Nombre, Marca, Codigo, Stock, Precio, CategoriaProductos, usuarios_idusuarios, estados_idestados, Foto)
                VALUES 
                    (@nombre, @marca, @codigo, @stock, @precio, @CategoriaProductos, @usuarios_idusuarios, @estados_idestados, @foto)
            `);
        
        res.status(201).json({ message: 'Producto creado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getProductos = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Productos');
        res.status(200).json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getProductoById = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', id)
            .query('SELECT * FROM Productos WHERE idProductos = @id');  
        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.updateProducto = async (req, res) => {
    try {
        const { id } = req.params;  
        const { 
            nombre, 
            marca, 
            codigo, 
            stock, 
            precio, 
            CategoriaProductos, 
            usuarios_idusuarios, 
            estados_idestados,
            foto
        } = req.body;

        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', id)  
            .input('nombre', nombre)
            .input('marca', marca)
            .input('codigo', codigo)
            .input('stock', stock)
            .input('precio', precio)
            .input('CategoriaProductos', CategoriaProductos)  
            .input('usuarios_idusuarios', usuarios_idusuarios)  
            .input('estados_idestados', estados_idestados)  
            .input('foto', foto)  
            .query(`
                UPDATE Productos
                SET 
                    Nombre = @nombre, 
                    Marca = @marca, 
                    Codigo = @codigo, 
                    Stock = @stock, 
                    Precio = @precio,
                    CategoriaProductos = @CategoriaProductos, 
                    usuarios_idusuarios = @usuarios_idusuarios,
                    estados_idestados = @estados_idestados,
                    Foto = @foto
                WHERE idProductos = @id  // Usamos idProductos
            `);
        
        res.status(200).json({ message: 'Producto actualizado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', id)  
            .query('DELETE FROM Productos WHERE idProductos = @id');  
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
