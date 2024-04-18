<template>
  <div class="profile">
    <v-divider/>
    <div class="profile__info">
      <div class="info__title">Фамилия:</div>
      <div class="info__value">{{ this.$store.getters.getCurUser.secondName }}</div>
    </div>
    <v-divider/>
    <div class="profile__info">
      <div class="info__title">Имя:</div>
      <div class="info__value">{{ this.$store.getters.getCurUser.firstName }}</div>
    </div>
    <v-divider/>
    <div class="profile__info">
      <div class="info__title">Отчество:</div>
      <div class="info__value">{{ this.$store.getters.getCurUser.patronymic }}</div>
    </div>
    <v-divider/>
    <div class="profile__info">
      <div class="info__title">Почта:</div>
      <div class="info__value">{{ this.$store.getters.getCurUser.email }}</div>
      <v-dialog
          v-if="!this.$store.getters.getCurUser.isConfirmed"
          v-model="dialog"
          max-width="500px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
          >
            Подтвердить почту
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Подтвердить почту</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-text-field
                  :disabled="!isSended"
                  v-model="code"
                  label="Код"
              ></v-text-field>
            </v-container>
          </v-card-text>
          <v-alert
              v-if="alert"
              prominent
              class="mt-4"
              :type="typeAlert"
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
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="blue darken-1"
                text
                @click="sendCode"
            >
              Получить код
            </v-btn>
            <v-btn
                :disabled="!isSended"
                color="blue darken-1"
                text
                @click="confirmEmail"
            >
              Подтвердить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-divider/>
  </div>
</template>

<script>
import {confirm, sendCode} from "@/api/profile";

export default {
  name: "ProfilePage",
  mounted() {
  },
  data() {
    return {
      dialog: false,
      code: "",
      isSended: false,
      alert: "",
      typeAlert: 'error'
    }
  },
  methods: {
    sendCode() {
      sendCode().then(() => {
        this.isSended = true;
        this.typeAlert = "success"
        this.alert = "Код с подтверждением отправлен на почту"
      }).catch(err => {
        this.typeAlert = "error"
        this.alert = err.response.data.description
      })
    },
    confirmEmail() {
      confirm(this.code).then(() => {
        this.isSended = false;
        this.typeAlert = "success"
        this.alert = "Учетная запись успешно подтверждена"
      }).catch(err => {
        this.typeAlert = "error"
        this.alert = err.response.data.description
      })
    },
    cancel() {
      this.alert = ''
    }
  },
}
</script>

<style scoped>
.profile {
  display: flex;
  flex-direction: column;
  padding: 30px;
  gap: 12px;
  width: 100%;
}

.profile__info {
  display: flex;
  align-items: center;
}

.info__title {
  font-size: 22px;
  font-weight: bold;
  width: 30%;
}

.info__value {
  font-size: 18px;
  width: 40%;
}
</style>
