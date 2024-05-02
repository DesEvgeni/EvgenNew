<template>
  <div>
    <h1>Подача статьи</h1>
    <form>
      <v-snackbar v-model="snackbar" :timeout="1500">
        {{ snackbarMessage }}
      </v-snackbar>
      <ol>
        <li>
          <h3>Требования к статье</h3>
          <div>Пожалуйста, подтвердите, что Вы выполнили все нижеперечисленные требования</div>
          <v-checkbox
              v-model="checkbox"
              label="Статья не была опубликована ранее в другом издании и не предназначена к публикации в другом издании"
          ></v-checkbox>
          <v-checkbox
              v-model="checkbox2"
              label="Текст статьи удовлетворяет требованиям, которые отражены в руководстве по написанию статьи"
          ></v-checkbox>
        </li>
        <li>
          <h3>Загрузка файлов</h3>
          <v-file-input
              show-size
              label="Архив с исходными материалами"
              ref="article"
              v-model="files"
          ></v-file-input>
          <v-file-input
              show-size
              label="Текст статьи"
          ></v-file-input>
        </li>
        <li>
          <h3>Метаданные статьи</h3>
          <v-text-field
              v-model="udk"
              label="УДК"
              required
          ></v-text-field>
          <v-text-field
              v-model="nameArticle"
              label="Название статьи"
              required
          ></v-text-field>
          <v-textarea
              v-model="annotation"
              label="Анотация"
              required
          ></v-textarea>
          <div class="authors">
            <div class="authors__list">
              <h4 class="mr-4">Список авторов</h4>
              <v-dialog
                  v-model="dialog"
                  width="900"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      class="href"
                      text
                      v-bind="attrs"
                      v-on="on"
                  >
                    Добавить автора
                  </v-btn>
                </template>
                <AuthorDialog @data-selected="handleDataSelected" :close-dialog="closeDialog"></AuthorDialog>
              </v-dialog>
            </div>
            <v-checkbox
                v-model="iAuthor"
                label="Я автор"
            ></v-checkbox>
          </div>
          <v-data-table
              :headers="headers"
              :items="authors"
              class="elevation-1"
          >
            <!-- eslint-disable-next-line -->
            <template v-slot:item.actions="{ item }">
              <v-icon
                  small
                  @click="deleteItem(item)"
              >
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </li>
      </ol>
      <div class="btns__submit">
        <v-btn class="mt-4 align-self-center btn-text" @click="handleSubmit" color="blue">Отправить статью</v-btn>
      </div>
    </form>
  </div>
</template>

<script>
import AuthorDialog from "@/components/AuthorDialog.vue";
import {createOfferArticle} from "@/api/userArticles";
import router from "@/router/router";

export default {
  name: "SubmitArticlePage",
  components: {AuthorDialog},
  data: () => ({
    snackbar: false,
    snackbarMessage: '',
    checkbox: false,
    checkbox2: false,
    iAuthor: false,
    udk: "",
    nameArticle: "",
    annotation: "",
    dialog: false,
    headers: [
      {
        text: 'Почта',
        align: 'start',
        value: 'email',
      },
      {text: 'Фамилия', value: 'secondName'},
      {text: 'Имя', value: 'firstName'},
      {text: 'Отчество', value: 'patronymic'},
      {text: '', value: 'actions', sortable: false},
    ],
    files: null,
    authors: []
  }),
  mounted() {
  },
  methods: {
    validateForm() {
      if (!this.checkbox || !this.checkbox2) {
        this.showSnackbar("Согласитесь к требованиям к статье!")
        return false
      }
      return true
    },
    showSnackbar(message) {
      this.snackbarMessage = message;
      this.snackbar = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    handleDataSelected(selectedData) {
      console.log('Selected data:', selectedData);
      this.authors = selectedData;
      this.closeDialog();
    },
    deleteItem(item) {
      const editedIndex = this.authors.indexOf(item)
      this.authors.splice(editedIndex, 1)
    },
    handleSubmit() {
      if (this.validateForm()) {
        const params = {
          "annotation": this.annotation,
          "authorIds": this.authors.map(author => author.id),
          "name": this.nameArticle,
          "udk": this.udk
        }
        createOfferArticle(params)
            .then((res) =>
                router.push({name: 'offer_article', params: {id: res.id}})
            )
            .catch((error) =>
                this.showSnackbar(error.response.data.description)
            )
      }
    }
  },
}
</script>

<style scoped>
.authors {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-text {
  color: white;
}

.href {
  color: #2196F3;
}

.btns__submit {
  display: flex;
  align-items: center;
  justify-content: right;
}

.authors__list {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-direction: row;
}

li::marker {
  font-size: 20px;
  font-weight: bold;
}
</style>
