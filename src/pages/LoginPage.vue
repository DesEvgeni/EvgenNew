<template>
  <div class="form-container">
    <form class="form mt-4">
      <v-text-field
          v-model="email"
          label="Почта"
          :rules="[rules.required, rules.email]"
          :error="wrongEmail"
          @input="() => wrongEmail = false"
          autocomplete="username"
      ></v-text-field>
      <v-text-field
          v-model="password"
          label="Пароль"
          :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          :type="showPassword ? 'text' : 'password'"
          :rules="[rules.required, rules.minLength]"
          :error="wrongPassword"
          @click:append="showPassword = !showPassword"
          @input="() => wrongPassword = false"
      ></v-text-field>
      <div class="form__footer">
        <v-btn @click="registr"
               class="btn-text"
               color="blue"
               text
        >Регистрация
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
  </div>
</template>

<script>
export default {
  data: () => ({
    email: 'admin@mail.ru',
    password: 'Qwerty123!',
    showPassword: false,
    rules: {
      required: value => !!value || 'Обязательное поле',
      minLength: v => v.length >= 8 || 'Длина не менее 8 символов',
      email: v => /.+@.+\..+/.test(v) || 'Неверный e-mail',
    },
    wrongPassword: false,
    wrongEmail: false,
    alert: ''
  }),
  methods: {
    submit() {
      if (this.email && this.password) {
        this.$store.dispatch("fetchCurUser", [this.email, this.password]).then(() => {
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
          if (error.response.data.code === "wrong_password") {
            this.wrongPassword = true
          }
          if (error.response.data.code === "account_not_found") {
            this.wrongEmail = true
          }
          this.alert = error.response.data.description
        });
      } else {
        this.alert = 'Пожалуйста, заполните все поля формы';
      }

    },

    clear() {
      this.email = '';
      this.password = '';
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

.form-container {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form {
  margin: auto;
  width: 380px;

  @media (max-width: 380px) {
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
