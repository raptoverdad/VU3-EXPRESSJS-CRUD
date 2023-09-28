const {Sequelize, DataTypes,Op} = require('sequelize');


class DataAccess {
  constructor() {
    if (DataAccess.instance) {
      return DataAccess.instance;
    }
    
    this.connection = null;
    this.User=null
    DataAccess.instance = this;
    this.isConnected = false; // Agregamos una propiedad para rastrear la conexión
  }

  async connect() {
    if (this.isConnected) {
      console.log('La conexión ya se realizó anteriormente.');
      return;
    }
  
    const retryInterval = 5000; // Intervalo entre reintentos en milisegundos
  
    while (true) {
      try {
        this.connection = new Sequelize('vueexpresscruddatabase', 'root', '123456', {
          host: 'express-mysql-db',
          dialect: 'mysql',
        });
        this.User = require('./models/user')(this.connection, DataTypes);
        await this.connection.authenticate();
        this.isConnected = true; // Actualizamos el estado de la conexión
        console.log('Conexión exitosa.');
        return; // Si la conexión es exitosa, sal del bucle
      } catch (error) {
        console.error('Error al conectar a la base de datos:');
        console.log(`Reintentando la conexión en ${retryInterval / 1000} segundos...`);
        await new Promise((resolve) => setTimeout(resolve, retryInterval));
      }
    }
  }

  async returnUser(nombre) {
    try {
    if (this.isConnected) {
      const usuarioEncontrado = await this.User.findAll({
        where: 
            { name: { [Op.eq]: nombre } },
      });      
      console.log("USUARIO ENCONTRADO:",usuarioEncontrado);
      if(usuarioEncontrado.length > 0){
         return usuarioEncontrado
      }else{
         return "user not found"
      }
    }
  } catch (error) {
    console.log("RETURN USER ERROR:",error);
    throw new Error("error del servidor")
  }
  }
  async returnUsers() {
    try {
      if (this.isConnected) {
        const users = await this.User.findAll();
        // Mapear los resultados para obtener solo dataValues
        const userValues = users.map(user => user.dataValues);
        return userValues;
      }
    } catch (error) {
      console.log("RETURN USERS ERR0R:",error)
      return false
    }

  }
  async insertUser(nombre, edad) {
    try {
      if (this.isConnected) {
        const usuarioEncontrado = await this.User.findAll({
          where: 
              { name: { [Op.eq]: nombre } },
        });      
        console.log("USUARIO ENCONTRADO:",usuarioEncontrado);
        if(usuarioEncontrado.length > 0){
          return "el usuario ya existe";
        }
        const user = await this.User.create({ name: nombre, age: edad });
        return "¡Usuario insertado correctamente!"; // Deberías devolver el usuario creado
    }
    } catch (error) {
      console.log("INSERT USER ERROR:",error)
      return "El usuario no fué insertado"
    }

}
  async deleteUser(nombre) {
    try {
      if (this.isConnected) {
        const usuarioEncontrado = await this.User.findAll({
          where: 
              { name: { [Op.eq]: nombre } },
        });      
        console.log("USUARIO ENCONTRADO:",usuarioEncontrado);
        if(usuarioEncontrado.length > 0){
          await this.User.destroy({
            where: {
              name: nombre
            }
          });
          return "¡Usuario eliminado correctamente!";
        }else{
           return "user not found"
        }
   
      }
    } catch (error) {
      console.log("DELETE USER ERROR:",error)
      return "El usuario no existe y/o no pudo ser eliminado"
    }

  }
}

module.exports = DataAccess;