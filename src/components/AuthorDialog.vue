<template>
  <v-card>
    <v-card-title>
      Поиск автора
      <v-spacer></v-spacer>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Поиск"
          single-line
          hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
        :footer-props="{'items-per-page-options':[5, 10, 15, 20]}"
        :options.sync="options"
        :server-items-length="totalCount"
        :loading="loading"
        v-model="selected"
        :headers="headers"
        :items="authors"
        :search="search"
        item-key="id"
        show-select
    >
      <template v-slot:top>
        <v-toolbar
            flat
        >
          <v-divider
              class="mx-4"
              inset
              vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
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
                Создать автора
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Создать автора</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-text-field
                      v-model="editedItem.email"
                      label="Почта"
                  ></v-text-field>
                  <v-text-field
                      v-model="editedItem.secondName"
                      label="Фамилия"
                  ></v-text-field>
                  <v-text-field
                      v-model="editedItem.firstName"
                      label="Имя"
                  ></v-text-field>
                  <v-text-field
                      v-model="editedItem.patronymic"
                      label="Отчество"
                  ></v-text-field>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                >
                  Отмена
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="createAuthor"
                >
                  Создать
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
    </v-data-table>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
          color="primary"
          text
          @click="submit"
      >
        Выбрать
      </v-btn>
    </v-card-actions>

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
  </v-card>
</template>

<script>
import {createAuthor, getAuthors} from "@/api/author";
import {debounce} from "@/service";

export default {
  name: "AuthorDialog",
  data() {
    return {
      totalCount: 0,
      loading: true,
      options: {},
      search: '',
      headers: [
        {
          text: 'Почта',
          align: 'start',
          value: 'email',
        },
        {text: 'Фамилия', value: 'secondName'},
        {text: 'Имя', value: 'firstName'},
        {text: 'Отчество', value: 'patronymic'}
      ],
      authors: [],
      selected: [],
      editedItem: {
        email: '',
        secondName: "",
        firstName: "",
        patronymic: ""
      },
      defaultItem: {
        email: '',
        secondName: "",
        firstName: "",
        patronymic: ""
      },
      dialog: false,
      alert: ''
    }
  },
  watch: {
    options: {
      handler: debounce(function() {
        this.getDataFromApi();
      }, 200),
      deep: true,
    },
    search: {
      handler: debounce(function() {
        this.getDataFromApi();
      }, 500),
      deep: true,
    }
  },
  methods: {
    submit() {
      this.$emit('data-selected', this.selected);
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
      })
    },
    createAuthor() {
      createAuthor(
          this.editedItem
      ).then(
          (data) => {
            this.authors.push(data)
            this.selected.push(data)
          }
      ).catch((error) => this.alert = error.response.data.description)
      this.close()
    },
    cancel() {
      this.alert = ''
    },
    getDataFromApi() {
      this.loading = true
      const {page, itemsPerPage} = this.options
      const params = {
        fullname: this.search,
        page: page-1,
        size: itemsPerPage
      }
      console.log(params)
      getAuthors(params).then(data => {
        this.authors = data.data
        this.totalCount = data.total
        this.loading = false
      })
    }
  },
  props: ['closeDialog'],
}
</script>
