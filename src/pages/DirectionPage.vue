<template>
  <div>
    Идет перенаправление на нужную страницу
  </div>
</template>

<script>
export default {
  name: "DirectionPage",
  beforeMount() {
    this.$store.dispatch("checkAuth").then(() => {
      if (this.$store.getters.getCurUser.isLogin) {
        this.$router.push('/main');
      } else {
        this.$router.push('/login');
      }
    }).catch(() => {
      this.$router.push('/login');
    })
  },
}
</script>

<style scoped>

</style>
