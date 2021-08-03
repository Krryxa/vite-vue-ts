import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import ElementPlus from 'element-plus';

import 'element-plus/lib/theme-chalk/index.css';

const app = createApp(App)

// 挂载全局方法
const globalFunc = (val: any) => {
  console.log('全局方法输出：', val)
}
app.config.globalProperties.$globalFunc = globalFunc

// 注册全局组件
app.component('my-component-name', {
  /* ... */
})

app.use(router)
app.use(ElementPlus)
app.mount('#app')
