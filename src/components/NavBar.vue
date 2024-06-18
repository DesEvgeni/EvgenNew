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
      <div class="nav-user">
        <h3 class="text-h5 white--text">{{ this.$store.getters.getFullName }}</h3>

        <v-menu
            v-if="this.$store.getters.getCurUser.canBeRoles.length > 0"
            v-model="menu"
            :close-on-content-click="true"
            transition="scale-transition"
            offset-y>
          <template v-slot:activator="{ on }">
            <v-btn class="btn-text" v-on="on" text>Изменить роль</v-btn>
          </template>

          <v-list>
            <v-list-item
                v-for="(role, index) in this.$store.getters.getCurUser.canBeRoles" :key="index"
                @click="changeRole(role)">
              <v-list-item-title>{{ roleTypes[role] }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn class="btn-text" @click="logout" text>Выйти</v-btn>
      </div>
    </v-app-bar-title>
  </v-app-bar>
</template>

<script>

import {roleTypes} from "@/service/types";

export default {
  name: "NavBar",
  computed: {
    roleTypes() {
      return roleTypes
    }
  },
  data() {
    return {
      menu: false,
    };
  },
  mounted() {

  },
  methods: {
    changeRole(role) {
      console.log('Отправлен запрос на изменение роли:', role);
    },

    logout() {
      this.$store.dispatch("logout")
      this.$router.push('/login');
    }
  }

}
</script>

<style>
a {
  text-decoration: none !important;
}

.btn-text {
  color: white !important;
}

.header {
  justify-content: space-between !important;
}

.v-app-bar-title__content {
  display: flex;
  justify-content: space-between !important;
  align-items: center;
  width: 100% !important;
}

.v-toolbar__content {
  display: flex;
  justify-content: space-between !important;
  align-items: center;
  width: 100% !important;
}

.nav-user {
  justify-content: space-between !important;
  display: flex;
}

</style>
