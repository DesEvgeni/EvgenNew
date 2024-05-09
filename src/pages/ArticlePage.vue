<template>
  <div>
    <v-data-table
        :footer-props="{'items-per-page-options':[5, 10, 15, 20]}"
        :options.sync="options"
        :server-items-length="totalCount"
        :loading="loading"
        :headers="headers"
        :items="articles"
        item-key="id"
        disable-sort
        @click:row="openArticle"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-select
              :items="articlesTypesArray"
              v-model="status_art"
              label="Статус статьи"
          ></v-select>
          <v-spacer></v-spacer>
          <v-select
              :items="sorted_art"
              v-model="sorted"
              label="Сортировать по..."
          ></v-select>
        </v-toolbar>
      </template>
      <!-- eslint-disable-next-line -->
      <template v-slot:item.status="{ item }">
        {{ articlesTypes[item.status] }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {debounce} from "@/service";
import {getArticles} from "@/api/userArticles";
import router from "@/router/router";
import {articlesTypes, orderTypes} from "../service/types";


export default {
  name: "ArticlePage",
  computed: {
    articlesTypes() {
      return articlesTypes
    },
    orderTypes() {
      return orderTypes
    }
  },
  data() {
    return {
      status_art: "",
      articlesTypesArray: Object.entries(articlesTypes).map(([value, text]) => ({value, text})),
      sorted: "DESC",
      sorted_art: Object.entries(orderTypes).map(([value, text]) => ({value, text})),
      totalCount: 0,
      loading: true,
      options: {},
      headers: [
        {
          text: 'Наименование',
          align: 'start',
          value: 'name',
        },
        {text: 'УДК', value: 'udk'},
        {text: 'Дата создания', value: 'created'},
        {text: 'Статус', value: 'status'},
        {text: '', value: 'actions', sortable: false},
      ],
      articles: [],
      dialog: false,
      alert: ''
    }
  },
  watch: {
    options: {
      handler: debounce(function () {
        this.getDataFromApi();
      }, 200),
      deep: true,
    },
    status_art: {
      handler: debounce(function () {
        this.getDataFromApi();
      }, 200),
      deep: true,
    },
    sorted: {
      handler: debounce(function () {
        this.getDataFromApi();
      }, 200),
      deep: true,
    }
  },
  methods: {
    getDataFromApi() {
      this.loading = true
      const {page, itemsPerPage} = this.options
      const params = {
        page: page - 1,
        size: itemsPerPage,
        status: this.status_art,
        orderByDate: this.sorted
      }
      console.log(params)
      getArticles(params).then(data => {
        this.articles = data.data
        this.totalCount = data.total
        this.loading = false
      })
    },
    openArticle(item) {
      router.push({name: 'offer_article', params: {id: item.id}})
    }
  }
}
</script>

<style scoped>
</style>
