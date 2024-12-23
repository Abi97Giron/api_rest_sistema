const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { poolPromise } = require('../config/database'); 

exports.login = async (req, res) => {
    const { correo, password } = req.body;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('correo', correo)
            .query('SELECT * FROM Usuarios WHERE Correo = @correo');

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const user = result.recordset[0];

        const validPassword = await bcrypt.compare(password, user.Password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }
        const token = jwt.sign({ id: user.UsuarioId }, 'tu_clave_secreta', { expiresIn: '24h' });

        res.status(200).json({
            message: 'Autenticación exitosa',
            token: token,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};