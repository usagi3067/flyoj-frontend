import { createApp } from "vue";
import ArcoVue from "@arco-design/web-vue";
import App from "./App.vue";
import "@arco-design/web-vue/dist/arco.css";
import router from "./router";
import store from "./store";
import "@/access"; // 引入全局权限管理

createApp(App).use(ArcoVue).use(store).use(router).mount("#app");
