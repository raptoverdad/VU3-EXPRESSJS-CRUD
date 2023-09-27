const DataAccess = require('../dataaccess/dataaccess');

class business {
  constructor() {
    this.DataAccess = null; // Inicializa la variable gateway
  }

  static async createInstance() {
    const businessInstance  = new business();
    businessInstance .DataAccess = new DataAccess(); // Crear una instancia de la clase DataAccess
    await businessInstance .DataAccess.connect(); // Conectar a la base de datos
    return businessInstance;
  }

  async getUsers(){
    if(this.DataAccess!=null)
    {
        let users=this.DataAccess.returnUsers()
        return users
    }
  }
  async getUser(usuario){
    if(this.DataAccess!=null)
    {
        let user=this.DataAccess.returnUser(usuario)
        return user
    }
  }
  async insertUser(usuario, edad){
    if(this.DataAccess!=null)
    {
        let insert=this.DataAccess.insertUser(usuario, edad)
        return insert
    }
  }
  async deleteUser(usuario){
    if(this.DataAccess!=null)
    {
        let deletee=this.DataAccess.deleteUser(usuario)
        return deletee
    }
  }
}

module.exports = business;