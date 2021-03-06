import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import mview from "../src/index.js";
import DemoCard from "./component/demo-card/index.vue";

Vue.config.productionTip = false;

Vue.use(mview);
Vue.component(DemoCard.name, DemoCard);

//偷懒，方便 开发中使用
// const requireComponent = require.context(
//   // 其组件目录的相对路径
//   "./components/",
//   // 是否查询其子目录
//   true,
//   // 匹配基础组件文件名的正则表达式
//   /index\.js$/
// );
// requireComponent.keys().forEach(fileName => {
//   // 获取组件配置
//   const componentConfig = requireComponent(fileName);

//   if (componentConfig.default && componentConfig.default.name) {
//     Vue.use(componentConfig.default);
//   }
// });

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");