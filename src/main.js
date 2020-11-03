import { createApp } from "vue";
// import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";
// Vue.config.devtools = true;

// import VueChatScroll from 'vue-chat-scroll' ;

// Vue.use(VueChatScroll);
//

const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");

// use this command to host on ngrok
// ./ngrok http 8080 -host-header="localhost:8887"
