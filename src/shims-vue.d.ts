declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
import * as lodash from 'lodash';
import * as marked from 'marked';

declare global { // 全局变量设置

    const _: typeof lodash
    const marked: typeof marked
}