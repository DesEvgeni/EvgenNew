<template>
  <form class="form mt-4">
    <v-text-field
        v-model="email"
        label="Почта"
        required
    ></v-text-field>
    <v-text-field
        v-model="password"
        label="Пароль"
        required
    ></v-text-field>
    <div class="form__footer">
      <a @click="registr">
        Зарегистрироваться
      </a>
      <div class="footer_btns">
        <v-btn @click="clear"
               class="btn-text"
               color="blue">
          Очистить
        </v-btn>
        <v-btn
            class="btn-text"
            @click="submit"
            color="blue">
          Войти
        </v-btn>
      </div>
    </div>
    <v-alert
        v-if="alert"
        prominent
        class="mt-4"
        type="error"
    >
      <v-row align="center">
        <v-col class="grow">
          {{ alert }}
        </v-col>
        <v-icon
            @click="cancel"
            class="mr-4"
            dark
            right
        >
          mdi-cancel
        </v-icon>
      </v-row>
    </v-alert>
  </form>
</template>

<script>
export default {
  data: () => ({
    email: 'admin@mail.ru',
    password: 'Qwerty123!',
    alert: ''
  }),
  methods: {
    submit() {
      if (
          this.email &&
          this.password
      ) {
        this.$store.dispatch("fetchCurUser", [this.email, this.password]).then(() => {
          if (this.$store.getters.getCurUser.isLogin) {
            this.$router.push('/main');
          } else {
            this.$router.push('/login');
          }
        }).catch((error) => {
          this.alert = error.response.data.description
        });
      } else {
        this.alert = 'Пожалуйста, заполните все поля формы';
      }

    },

    clear() {
      this.login = '';
      this.pass = '';
    },
    registr() {
      this.$router.push('/register');
    },
    cancel() {
      this.alert = ''
    }
  },
}
</script>

<style scoped>
.form {
  margin: auto;
  width: 40%;
}

.btn-text {
  color: white;
}

.form__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer_btns {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
</style>
