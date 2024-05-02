<template>
  <div>
    <v-snackbar v-model="snackbar" :timeout="1500">
      {{ snackbarMessage }}
    </v-snackbar>
    <div class="btns__submit">
      <v-btn class="mt-4 align-self-center btn-text" color="red" @click="deleteArticle">Удалить статью</v-btn>
      <v-btn class="mt-4 align-self-center btn-text" color="blue" @click="editArticle">Сохранить статью</v-btn>
    </div>
    <form>
      <v-snackbar v-model="snackbar" :timeout="1500">
        {{ snackbarMessage }}
      </v-snackbar>

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
    </form>
    <offer-articles-version></offer-articles-version>
  </div>
</template>
<script>
import {deleteArticle, editArticle, getArticle} from "@/api/userArticles";
import AuthorDialog from "@/components/AuthorDialog.vue";
import router from "@/router/router";
import OfferArticlesVersion from "@/components/OfferArticlesVersion.vue";

export default {
  name: "OfferArticle",
  components: {OfferArticlesVersion, AuthorDialog},
  data() {
    return {
      snackbar: false,
      snackbarMessage: '',
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
      authors: [],
      status: "",
      created: ""
    };
  },
  mounted() {
    getArticle(this.$route.params.id)
        .then((article) => {
              console.log(article)
              this.authors = article.authors;
              this.nameArticle = article.name;
              this.annotation = article.annotation;
              this.udk = article.udk;
              this.status = article.status;
              this.created = article.created;
            }
        ).catch(error =>
        this.showSnackbar(error.response.data.description)
    )
  },
  methods: {
    showSnackbar(message) {
      this.snackbarMessage = message;
      this.snackbar = true;
    },
    deleteItem(item) {
      const editedIndex = this.authors.indexOf(item)
      this.authors.splice(editedIndex, 1)
    },
    closeDialog() {
      this.dialog = false;
    },
    handleDataSelected(selectedData) {
      console.log('Selected data:', selectedData);
      this.authors = selectedData;
      this.closeDialog();
    },
    deleteArticle() {
      deleteArticle(this.$route.params.id)
          .then(() => {
                this.showSnackbar("Статья успешно удалена")
                router.push({name: 'articles'})
              }
          )
          .catch((error) =>
              this.showSnackbar(error.response.data.description)
          )
    },
    editArticle() {
      const params = {
        "annotation": this.annotation,
        "authorIds": this.authors.map(author => author.id),
        "name": this.nameArticle,
        "udk": this.udk
      }
      editArticle(this.$route.params.id, params)
          .then(() =>
              this.showSnackbar("Статья успешно сохранена")
          )
          .catch((error) =>
              this.showSnackbar(error.response.data.description)
          )
    }
  }
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
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.authors__list {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-direction: row;
}

</style>
