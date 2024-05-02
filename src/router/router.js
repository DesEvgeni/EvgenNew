import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../pages/DirectionPage.vue"),
  },
  {
    path: "/main",
    component: () => import("../pages/MainPage"),
  },
  {
    path: "/login",
    component: () => import ("../pages/LoginPage"),
  },
  {
    path: "/register",
    component: () => import ("../pages/RegisterPage"),
  },
  {
    path: "/profile",
    component: () => import ("../pages/ProfilePage"),
  },
  {
    path: "/articles",
    name: "articles",
    component: () => import ("../pages/ArticlePage"),
  },
  {
    path: "/offer_article/:id",
    name: "offer_article",
    component: () => import ("../pages/OfferArticle.vue"),
  },
  {
    path: "/submit_article",
    component: () => import ("../pages/SubmitArticlePage"),
  },
  {
    path: "/error404",
    component: () => import("../pages/Error404"),
  },
  { path: "/:catchAll(.*)", redirect: "/error404" },
];

export default new VueRouter({
  mode: "history",
  routes: routes,
});
