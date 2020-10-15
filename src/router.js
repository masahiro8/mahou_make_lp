import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./views/Home.vue";
import Book from "./views/Book.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home },
  { path: "/book", component: Book }
];

const router = new VueRouter({ routes, mode: "history" });

export default router;
