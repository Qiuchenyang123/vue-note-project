import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './styles/reset.css'
import './styles/article.scss'
import request from "@/api";
import {_} from "lodash";
import marked from 'marked'
// import 'cropperjs/dist/cropper.css';

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.prototype.$request = request;
Vue.prototype._ = _
Vue.prototype.marked = marked
console.log(199999, _);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
