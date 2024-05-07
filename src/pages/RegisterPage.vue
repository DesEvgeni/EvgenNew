<template>
  <div class="form-container">
    <form class="form mt-4">
      <v-text-field
          v-model="email"
          label="Почта"
          :rules="[rules.required, rules.email]"
          required
      ></v-text-field>
      <v-text-field
          v-model="pass"
          label="Пароль"
          :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          :type="showPassword ? 'text' : 'password'"
          :rules="[rules.required, rules.minLength]"
          @click:append="showPassword = !showPassword"
          required
      ></v-text-field>
      <v-text-field
          v-model="pass2"
          label="Повторите пароль"
          :append-icon="showPassword2 ? 'mdi-eye-off' : 'mdi-eye'"
          :type="showPassword2 ? 'text' : 'password'"
          :rules="[rules.required, (v) => rules.passwordConfirmationRule(pass, v)]"
          @click:append="showPassword2 = !showPassword2"
          required
      ></v-text-field>
      <v-text-field
          v-model="secondName"
          label="Фамилия"
          :rules="[rules.required]"
          required
      ></v-text-field>
      <v-text-field
          v-model="firstName"
          label="Имя"
          :rules="[rules.required]"
          required
      ></v-text-field>
      <v-text-field
          v-model="patronymic"
          label="Отчество"
      ></v-text-field>
      <div class="form__footer">
        <v-btn @click="login"
               class="btn-text"
               color="blue"
               text
        >Вход
        </v-btn>
        <div class="footer_btns">
          <v-btn @click="clear"
                 class="btn-text"
                 color="blue"
                 outlined
          >Очистить
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
  </div>

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
    alert: '',
    showPassword: false,
    showPassword2: false,
    rules: {
      required: value => !!value || 'Обязательное поле',
      minLength: v => v.length >= 8 || 'Длина не менее 8 символов',
      email: v => /.+@.+\..+/.test(v) || 'Неверный e-mail',
      passwordConfirmationRule: (pass, pass2) => pass === pass2 || 'Пароли не совпадают',
    },
  }),
  methods: {
    async submit() {
      if (
          this.secondName &&
          this.firstName &&
          this.email &&
          this.pass &&
          this.pass2
      ) {
        if (this.pass === this.pass2) {
          this.$store.dispatch("registerNewUser", [this.email, this.firstName, this.pass, this.secondName, this.patronymic]).then(() => {
            if (this.$store.getters.getCurUser.isLogin) {
              this.$router.push('/main');
            } else {
              this.$router.push('/login');
            }
          }).catch((error) => {
            if (!error?.response?.data) {
              this.alert = "Ошибка сервера"
              return
            }
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

.form-container {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form {
  margin: auto;
  width: 440px;

  @media (max-width: 440px) {
    width: 100%;
  }
}

.btn-text {
  color: white;
}

.form__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.footer_btns {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
