<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import resource from './api/resource.js'
  export default {
    created(){
      // this.$router.push('/home');
    }

  }
</script>

