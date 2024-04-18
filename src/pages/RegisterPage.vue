<template>
  <form class="form mt-4">
    <v-text-field
        v-model="email"
        label="Почта"
        required
    ></v-text-field>
    <v-text-field
        v-model="pass"
        label="Пароль"
        required
    ></v-text-field>
    <v-text-field
        v-model="pass2"
        label="Повторите пароль"
        required
    ></v-text-field>
    <v-text-field
        v-model="secondName"
        label="Фамилия"
        required
    ></v-text-field>
    <v-text-field
        v-model="firstName"
        label="Имя"
        required
    ></v-text-field>
    <v-text-field
        v-model="patronymic"
        label="Отчество"
        required
    ></v-text-field>
    <div class="form__footer">
      <a @click="login">
        Войти
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
          Зарегистрироваться
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
    secondName: '',
    firstName: '',
    patronymic: '',
    email: '',
    pass: '',
    pass2: '',
    alert: ''
  }),
  methods: {
    async submit() {
      if (
          this.secondName &&
          this.firstName &&
          this.patronymic &&
          this.email &&
          this.pass &&
          this.pass2
      ) {
        if (this.pass === this.pass2) {
          this.$store.dispatch("registerNewUser", [this.email, this.firstName, this.pass, this.secondName]).then(() => {
            if (this.$store.getters.getCurUser.isLogin) {
              this.$router.push('/main');
            } else {
              this.$router.push('/login');
            }
          }).catch((error) => {
            this.alert = error.response.data.description
          });
        } else {
          this.alert = 'Пароли не совпадают, проверьте правильность ввода';
        }
      } else {
        this.alert = 'Пожалуйста, заполните все поля формы';
      }
    },

    clear() {
      this.login = '';
      this.pass = '';
      this.secondName = '';
      this.firstName = '';
      this.patronymic = '';
      this.pass2 = '';
    },
    login() {
      this.$router.push('/login');
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
  width: 50%;
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
