import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Chat from "@/views/Chat.vue";

// this.$store.state.name

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
    props: true,
    // beforeEnter: (to, from, next) => {
    //   if (to.params.name) {
    //     next();
    //   } else {
    //     next({ name: "Login" });
    //   }
    // },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
