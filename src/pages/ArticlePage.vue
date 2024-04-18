<template>
  <div>
    У вас нет статей
  </div>
</template>

<script>
export default {
  name: "ArticlePage",
  mounted() {
    this.$store.dispatch("fetchArticles", {page: 0, size: 10})
  },
}
</script>

<style scoped>
</style>
