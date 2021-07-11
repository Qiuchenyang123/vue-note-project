<template>
  <div id="app">
<!--    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
      <validateLayout>
          <router-view/>
      </validateLayout>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
<script>
    import validateLayout from "@/views/validateLayout";
    export default {
        name: 'App',
        components: {
            validateLayout
        }
    }
</script>