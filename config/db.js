const mongoose = require('mongoose');

require('dotenv').config({ path: 'variables.env' });

const conectarDB = async () => {
    try{
        // metodo de mongo,lleva 2 parametros a donde se conecta y objeto de config
        await mongoose.connect(process.env.DB_MONGO, {
            
            // cierta configuracion que genera errores en consola
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('DB conectada');
    } catch(error){
        console.log(error);
        process.exit(1); // Detener la app
    }
}

module.exports = conectarDB;