//Vue3相比Vue2引入的不是构造函数,而是一个名为careateApp的工厂函数
import { createApp } from 'vue'
import App from './App.vue'
//创建应用实例对象(类似Vue2中的vm,但是比vm更“轻”),因为它是一个普通的对象
const app = createApp(App);
//挂载
app.mount('#app');
// console.log(app);
