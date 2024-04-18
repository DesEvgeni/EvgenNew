import Vue from "vue";
import Vuex from "vuex";
import authModule from "@/store/authModule";
import articlesModule from "@/store/articlesModule";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authModule,
    articlesModule
  },
});
