<template>
  <v-app-bar
      app
      color="blue"
      class="header"
  >
    <v-app-bar-title class="nav">
      <h3 class="text-h5 white--text">Электронная редакция СВМО</h3>
    </v-app-bar-title>
    <v-app-bar-title class="nav" v-if="this.$store.getters.getCurUser.isLogin">
      <h3 class="text-h5 white--text">{{this.$store.getters.getFullName}}</h3>
    </v-app-bar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar",
  data: () => ({}),
  mounted() {

  },
  methods: {

  }

}
</script>

<style>
a {
  text-decoration: none !important;
}

.header {
  justify-content: space-between !important;
}

.v-toolbar__content {
  display: flex;
  justify-content: space-between !important;
  align-items: center;
  width: 100% !important;
}

</style>
