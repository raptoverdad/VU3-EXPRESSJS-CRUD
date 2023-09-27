<template>
  <div class="notAuthenticated"  v-if="$store.state.token == false">
    <h1>VUE 3 // EXPRESS JS BY RODRIGO MIRANDA</h1>
    <h1>Authenticated: </h1><h2>{{$store.state.token}}</h2>
</div>

<div  class="Authenticated" v-if="$store.state.token != false">
    <h1>VUE 3 // EXPRESS JS BY RODRIGO MIRANDA</h1>
    <h1>Authenticated: </h1><p>{{$store.state.token}}</p>
</div>
  <router-view/>
</template>
<script>


export default {
  computed: {

  },
  methods: {

  },
  // Resto de las opciones de tu componente
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.notAuthenticated{
    width: 100%;
    height: 20vh;
    background-color: #FF9999 ;
    border: 4px solid #FF6666;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0% 10%;
    font-family: 'Titillium Web', sans-serif;
}
.Authenticated{
    width: 100%;
    height: 20vh;
    border: 4px solid #66FF99;
    background-color: #99FFB3;display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow:auto;
    font-family: 'Titillium Web', sans-serif;
}
p{
width: 100%;
text-align: center;
}
*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
</style>
