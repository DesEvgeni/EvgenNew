<template>
  <div class="mt-4">
    <div class="version__list">
      <h4 class="mr-4">Список версий</h4>
      <v-btn
          color="primary"
          text
          class="mb-2"
          @click="addNewVersion"
          v-if="showDraftVersionButton"
      >
        Добавить новую версию
      </v-btn>
    </div>
    <v-card>
      <v-snackbar v-model="snackbar" :timeout="1500">
        {{ snackbarMessage }}
      </v-snackbar>
      <v-data-table
          :footer-props="{'items-per-page-options':[5, 10, 15, 20]}"
          :options.sync="options"
          :server-items-length="totalCount"
          :loading="loading"
          :headers="headers"
          :items="versions"
          item-key="id"
      >
        <!-- eslint-disable-next-line -->
        <template v-slot:item.articleArchiveId="{ item }">
          <div class="fileInput">
            <v-file-input
                v-if="item.draft"
                :ref="'articleArchiveId' + item.id"
                label="Выберите файл"
                @change="uploadFile(item, 'articleArchiveId')"
            ></v-file-input>
            <v-icon
                color="blue"
                v-if="item.articleArchiveId"
                @click="downloadFile(item,'articleArchiveId')"
            >mdi-download
            </v-icon>
            <!--          <div @click="downloadFile(item, 'articleArchiveId')">Загрузить</div>-->
          </div>
        </template>
        <!-- eslint-disable-next-line -->
        <template v-slot:item.documentsArchiveId="{ item }">
          <div class="fileInput">
            <v-file-input
                v-if="item.draft"
                :ref="'documentsArchiveId' + item.id"
                label="Выберите файл"
                @change="uploadFile(item, 'documentsArchiveId')"
            ></v-file-input>
            <v-icon
                color="blue"
                v-if="item.documentsArchiveId"
                @click="downloadFile(item, 'documentsArchiveId')"
            >mdi-download
            </v-icon>
            <!--          <div @click="downloadFile(item, 'documentsArchiveId')">Загрузить</div>-->
          </div>
        </template>
        <!-- eslint-disable-next-line -->
        <template v-slot:item.answer="{ item }">
          <div class="fileInput">
            <v-icon
                v-if="item.answer?.documentId"
                color="blue"
                @click="downloadFile(item.answer, 'documentId')"
            >mdi-download
            </v-icon>
            <!--          <div @click="downloadFile(item, 'documentsArchiveId')">Загрузить</div>-->
            <v-text-field
                v-if="item.answer?.comment"
                disabled
                v-model="item.answer.comment"
            ></v-text-field>
          </div>
        </template>
        <!-- eslint-disable-next-line -->
        <template v-slot:item.comment="{ item }">
          <v-text-field
              v-if="item.draft"
              v-model="item.comment"
              @blur="handleBlur(item)"
          ></v-text-field>
          <v-text-field
              v-if="!item.draft"
              v-model="item.comment"
              disabled
          ></v-text-field>
        </template>
        <!-- eslint-disable-next-line -->
        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom v-if="item.draft">
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                  color="green"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  @click="submitVersion()"
              >
                mdi-check
              </v-icon>
            </template>
            <span>Отправить статью на проверку</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import {debounce} from "@/service";
import {editVersions, getVersions, submitVersion} from "@/api/userArticles";
import {downloadFile, uploadFile} from "@/api/file";

export default {
  name: "OfferArticlesVersion",
  data() {
    return {
      totalCount: 0,
      snackbar: false,
      snackbarMessage: '',
      loading: true,
      options: {},
      headers: [
        {
          text: 'Дата создания',
          align: 'start',
          value: 'created',
        },
        {text: 'Архив (ст)', value: 'articleArchiveId'},
        {text: 'Архив (дк)', value: 'documentsArchiveId'},
        {text: 'Комментарий', value: 'comment'},
        {text: 'Ответ', value: 'answer'},
        {text: '', value: 'actions', sortable: false},
      ],
      versions: [],
      dialog: false,
      alert: '',
      showDraftVersionButton: false
    }
  },
  watch: {
    options: {
      handler: debounce(function () {
        this.getDataFromApi();
      }, 200),
      deep: true,
    },
  },
  methods: {
    addNewVersion() {
      this.versions.push({
        created: "",
        articleArchiveId: "",
        documentsArchiveId: "",
        comment: "",
        answer: "",
        draft: true
      })
      console.log(this.versions)
      this.showDraftVersionButton = false
    },
    showSnackbar(message) {
      this.snackbarMessage = message;
      this.snackbar = true;
    },
    submit() {
      this.$emit('data-selected', this.selected);
    },
    getDataFromApi() {
      this.loading = true
      const {page, itemsPerPage} = this.options
      const params = {
        page: page - 1,
        size: itemsPerPage
      }
      console.log(params)
      getVersions(this.$route.params.id, params).then(data => {
        this.versions = data.data
        this.totalCount = data.total
        this.showDraftVersionButton = data.showDraftVersionButton
        this.loading = false
      })
    },
    submitVersion() {
      submitVersion(this.$route.params.id)
          .then(() => {
            this.showSnackbar("Статья успешно отправлена на проверку")
            this.getDataFromApi()
          })
          .catch((err) => this.showSnackbar(err.response.data.description))
    },
    async uploadFile(item, column) {
      const file = await this.$refs[column + item.id].$refs.input.files[0];
      if (file) {
        await uploadFile(file).then((res) => {
          const params = item;
          params[column] = res.fileId;
          console.log(params)
          editVersions(this.$route.params.id, params).then(() => this.getDataFromApi()
          )
        }).catch((err) => this.showSnackbar(err.response.data.description))

      }
    },
    handleBlur(item) {
      editVersions(this.$route.params.id, item)
    },
    async downloadFile(item, column) {
      const response = await downloadFile(item[column]);
      const blob = new Blob([response.data], {type: 'application/octet-stream'});
      console.log("blob", blob)
      const url = window.URL.createObjectURL(blob);
      console.log("url", url)
      const a = document.createElement('a');
      a.href = url;
      let tempName = response.headers['content-disposition'].split(';')[1].split('filename=')[1]
      a.download = tempName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  },
  props: ['closeDialog'],
}
</script>

<style scoped>
.fileInput {
  display: flex;
  align-items: center;
  gap: 10px;
}

.version__list {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-direction: row;
}
</style>
