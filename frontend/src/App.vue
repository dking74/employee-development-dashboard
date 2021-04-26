<template>
  <div id="app">
    <b-container fluid>
      <b-row>
        <b-col cols="2" class="px-0">
          <ed-side-bar></ed-side-bar>
        </b-col>
        <b-col cols="9" cols-md="8" class="mt-5 ed-main-content-area">
          <router-view/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import EdSideBar from './components/SideBar.vue';

export default {
  name: 'App',
  components: { EdSideBar },
  watch: {
    isAppIdle(isIdle) {
      if (isIdle) this.$auth.logout();
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#app > .container-fluid {
  margin: 0;
  height: 100%;
  position: absolute;

  .row {
    width: 100%;
    top: 0;
    bottom: 0;
    position: absolute;
  }
}

#app .ed-main-content-area .container-fluid {
  top: initial;
  bottom: initial;
  position: initial;
  .row {
    width: initial;
    top: initial;
    bottom: initial;
    position: initial;
  }
}
</style>
