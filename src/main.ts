import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './styles/reset.css'
import './styles/article.scss'
import 'leaflet/dist/leaflet.css'
import request from "@/api";
import {_} from "lodash";
import marked from 'marked'
import Antd from 'ant-design-vue';
// import 'cropperjs/dist/cropper.css';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Antd)
Vue.prototype.$request = request;
Vue.prototype._ = _
Vue.prototype.marked = marked
console.log(199999, _);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
