<template>
  <div class="nav">
    <div class="nav__links">
      <router-link to="/main" class="nav-link" exact>Главная</router-link>
      <router-link to="/profile" class="nav-link" exact>Профиль</router-link>
      <router-link to="/articles" class="nav-link" exact>Мои статьи</router-link>
      <router-link to="/submit_article" class="nav-link" exact>Подача статьи</router-link>
    </div>
    <v-btn
        class="btn-text align-self-center"
        @click="logout"
        color="blue">
      Выйти
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "NavigationBlock",
  data: () => ({}),
  mounted() {
    const currentRoute = this.$route.path;
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      if (link.getAttribute('to') === currentRoute) {
        link.classList.add('active');
      }
    });
  },
  methods: {
    logout() {
      this.$store.dispatch("logout")
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none !important;
}

.btn-text {
  color: white;
}

.nav {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  border-right: gray 1px solid;
  min-width: 300px;
}

.nav__links {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.nav__links a {
  width: 100%;
  padding: 3px 5px;
  border-radius: 3px;
  text-decoration: none;
  color: black;
  font-size: 20px;
}

.router-link-active {
  background-color: #2196F3  !important;
  color: white !important;
}
</style>
