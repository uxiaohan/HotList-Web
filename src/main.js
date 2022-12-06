import Vue from "vue";
import App from "./App.vue";
// 初始化CSS样式
import "@/assets/css/app.less";
import "@/assets/css/main.less";
// Element-Ui
import elementArr from "@/plugins/element";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;

Object.values(elementArr).forEach((itm) => {
  Vue.use(itm);
});

import { Notification } from "element-ui";
Vue.prototype.$notify = Notification;

new Vue({
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
