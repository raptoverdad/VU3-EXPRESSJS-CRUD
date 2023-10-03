<template>
<div class="homeWrapper">
    <div>
        <h2>Click bellow to authenticate</h2>
        <button v-on:click="getToken()">Authenticate</button>
       <span v-if="$store.state.isLoading.authenticate==true">cargando...</span>
    </div>

    <div>
        <h2>Click here to GET users from database</h2>
        <button v-on:click="getUsers" >Get users</button>
        <span  v-if="$store.state.isLoading.getUsers==true">cargando...</span>
        <h3 v-if="getUsersResponse != ''">USERS:</h3>
        <ul v-if="getUsersResponse != ''" class='users'>
            <li v-for="user in getUsersResponse">-Name: {{ user.name }}-Age: {{ user.age }}</li>

        </ul>
    </div>

    <div>
        <h2>Type here to DELETE users from database</h2>
        <p>username:</p>
        <input type="text" v-model="deleteUserValue">
        <input type="button" v-on:click="deleteUser" value="Delete user">
        <span v-if="$store.state.isLoading.deleteUser==true">cargando...</span>
        <h3 v-if="deleteUserResponse != '' ">{{deleteUserResponse}}</h3>
    </div>

    <div>
        <h2>Type here to INSERT users to database</h2>
        <p>username:</p>
        <input type="text" v-model="insertUserValue">
        <p>age:</p>
        <input type="text" v-model="insertAgeValue">
        <input type="button" v-on:click="insertUser" value="Insert user">
        <span  v-if="$store.state.isLoading.insertUser==true">cargando...</span>
        <h3 v-if="insertUserResponse != ''" >{{insertUserResponse}}</h3>
    </div>

    <div>
        <h2>Type here to GET user by name</h2>
        <p>username:</p>
        <input type="text" v-model="user">
        <input v-on:click="getUser()" type="button" value="Get user">
        <span v-if="$store.state.isLoading.getUserByName==true">cargando...</span>
        <h3 v-if="getUserResponse !='' && getUserResponse != 'user not found'">USER:</h3>
        <ul v-if="getUserResponse !='' && getUserResponse != 'user not found'">
            <li v-if="getUserResponse !='' && getUserResponse != 'user not found'">{{ "name:"+getUserResponse[0].name }}</li>
            <li v-if="getUserResponse !='' && getUserResponse != 'user not found'">{{ "age:"+getUserResponse[0].age }}</li>
        </ul>
        <h3 v-if="getUserResponse == 'user not found'">{{ getUserResponse }}</h3>
    </div>
</div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  data() {
  return {
    user: "",
    getUserResponse:'',
    insertUserResponse:'',
    insertUserValue:'',
    insertAgeValue:'',
    deleteUserValue:'',
    deleteUserResponse:'',
    getUsersResponse:''
  }
},
  components: {
    
  },
  created(){
alert("¡Bienvenido! / welcome!")
  },
  methods:{
    async getToken(){
       await this.$store.dispatch('fetchToken');
    },
    async getUser(){
      if(this.user != ""){
        if(this.$store.state.token != false){
          let response=await this.$store.dispatch('fetchUser',this.user);
          this.getUserResponse=response
        }else{
          alert("aunthenticate before get the user from the database")
        }
       
      }

    },
    async deleteUser(){
      if(this.deleteUserValue!= ""){
        if(this.$store.state.token != false)
        {
          let response=await this.$store.dispatch('fetchDeleteUser',this.deleteUserValue);
      this.deleteUserResponse=response
        }else{
          alert("aunthenticate before delete the user from the database")
        }

      }

    },
    async insertUser() {
  if (this.insertUserValue !== "" && this.insertAgeValue !== "") {
    if(this.$store.state.token != false){
      if (!isNaN(this.insertAgeValue)) {
      // insertAgeValue es un número válido
      let response = await this.$store.dispatch('fetchInsertUser', { nombre: this.insertUserValue, edad: this.insertAgeValue });
      this.insertUserResponse = response;
    } else {
      // Maneja el caso en el que insertAgeValue no es un número válido
     alert("Debes ingresar una edad valida")
      // Puedes mostrar un mensaje de error al usuario o realizar otra acción adecuada.
    }
    }else{
      alert("autenticate antes de insertar usuarios")
    }
   
  }
},
async getUsers() {

 if(this.$store.state.token != ''){
  console.log("VARIABLE DE ENTORNO URL=",process.env.URL)
  let response = await this.$store.dispatch('fetchUsers');
      this.getUsersResponse = response;
 }else{
  alert("autenticate antes de acceder a la lista de usuarios")
 }
    

  
}
  }
}
</script>
<style scoped>
.homeWrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80vh;
    font-family: 'Titillium Web', sans-serif;
}
.homeWrapper div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 20%;
    height: 80vh;
    text-align: center;
    border: 4px solid #6699FF;
    background-color: #99B3FF;
}
.DemoNavButton{
    width: 50vw;
    height: 6vh;
    background: #444;
    border: 2px solid #fff;
    color: #fff;
}
ul{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    list-style-type: none;
    max-width: 80%;
    max-height: 60vh;
    overflow: scroll;
}

.loading-indicator{
  height: 5vh;
}
ul li{
    font-size: x-large;
}
</style>
