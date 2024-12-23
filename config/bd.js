const sql = require('mssql');

const sqlConfig = {
    user: 'DESKTOP-H5DBAQ2\Usuario', 
    password: '1234', 
    database: 'GDA00475-OT-AbigailGiron',
    server: 'localhost',
    port: 1433,
    options: {
        encrypt: false, 
        trustServerCertificate: true
    }
};

const poolPromise = new sql.ConnectionPool(sqlConfig)
    .connect()
    .then(pool => {
        console.log('Conexión exitosa a la base de datos SQL Server');
        return pool;
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos:', err);
        process.exit(1); 
    });

module.exports = {
    sql, poolPromise
};
