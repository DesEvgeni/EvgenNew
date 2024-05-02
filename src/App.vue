<template>
  <v-app>
    <NavBar></NavBar>
    <v-main class="main">
      <NavigationBlock v-if="this.$store.getters.getCurUser.isLogin"></NavigationBlock>
      <router-view class="page"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import NavigationBlock from "@/components/NavigationBlock";

export default {
  name: 'App',
  components: {NavBar, NavigationBlock},
  beforeMount() {
    this.$store.dispatch("checkAuth").then(() => {
      if (this.$store.getters.getCurUser.isLogin) {
        if (this.$route.path) {
          this.$router.push(this.$route.path);
        } else {
          this.$router.push('/main');
        }
      } else {
        this.$router.push('/login');
      }
    }).catch(() => {
      this.$router.push('/login');
    })
  },
}
</script>
<style>
.v-main__wrap {
  display: flex !important;
  flex-direction: row !important;

}

.page {
  padding: 20px;
  justify-self: center;
  min-width: 80%;
}
</style>
