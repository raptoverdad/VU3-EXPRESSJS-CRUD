import { createStore } from 'vuex'
import axios from 'axios'; // Asegúrate de importar axios si no lo has hecho

export default createStore({
  state: {
    token: false, // Inicializa el token como nulo
    isLoading: {
      authenticate: false,
      getUsers: false,
      getUserByName: false,
      insertUser: false,
      deleteUser: false
    }
  },
  getters: {
    // Agrega tus getters si es necesario
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    async fetchToken({ commit,state }) {
      try {
      state.isLoading.authenticate=true
        const response = await axios.get(`${process.env.URL}/authenticate`);
        const token = response.data.token
        commit('setToken', token);
        state.isLoading.authenticate=false
      } catch (error) {
        state.isLoading.authenticate=false
        alert("Error al autenticar")
        console.error('Error al obtener el token:', error);
        state.isLoading.authenticate=false
      }
    },
    async fetchUser({ commit, state }, user) {

  
          try {
            const config = {
              headers: {
                Authorization: `Bearer ${state.token}`
              }
            }
            console.log(user)
            state.isLoading.getUserByName = true;
            const url = `http://${process.env.URL}/getUserByName/${user}`; 
            const response = await axios.get(url,config);
            const responseUser = response.data.user;
            state.isLoading.getUserByName = false;
            console.log("response user",responseUser)
            return responseUser
          } catch (error) {
            
        console.log("ERROR:",error)
        state.isLoading.getUserByName = false;
        alert("Hubo un error en el servidor")
          }
      


    },
    
    async fetchUsers({ commit, state }) {

          try {
            const config = {
              headers: {
                Authorization: `Bearer ${state.token}`
              }
            }
            state.isLoading.getUsers = true;
            const url = `http://${process.env.URL}/getUsers`; // Concatena user en la URL
            const response = await axios.get(url,config);
            const responseUser = response.data.users;
            state.isLoading.getUsers = false;
            console.log("response user",responseUser)
            return responseUser
          } catch (error) {
            
        console.log("ERROR:",error)
        state.isLoading.getUsers = false;
        alert("Hubo un error en el servidor")
          }
      


    },
    async fetchDeleteUser({ commit, state }, user) {

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${state.token}`
          }
        }
        console.log(user)
        state.isLoading.deleteUser = true;
        const url = `http://${process.env.URL}/deleteUser/${user}`; // Concatena user en la URL
        const response = await axios.delete(url,config);
        const responseUser = response.data.delete;
        state.isLoading.deleteUser = false;
        console.log("response user",responseUser)
        return responseUser
      } catch (error) {
        
    console.log("ERROR:",error)
    state.isLoading.deleteUser = false;
    alert("Hubo un error en el servidor")
      }
  
},
    async fetchInsertUser({ commit, state }, data) { 
          try {
            const config = {
              headers: {
                Authorization: `Bearer ${state.token}`
              }
            }
            state.isLoading.insertUser = true;
            const url = `http://${process.env.URL}/insertUser`; // Concatena user en la URL
            const response = await axios.post(url,{name:data.nombre,age:data.edad},config);
            const responseUser = response.data.insert;
            state.isLoading.insertUser = false;
            console.log("response user",responseUser)
            return responseUser
          } catch (error) {
            
        console.log("ERROR:",error)
        state.isLoading.getUserByName = false;
        alert("Hubo un error en el servidor")
          }
    }
  },
  modules: {
    // Agrega tus módulos si es necesario
  }
})