<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" /> -->
  <!-- <Demo @hello="hello"  msg="你好啊">
      <template v-slot:sex>
        <h2>sex:男</h2>
      </template>
    </Demo> -->
  <!-- <Count></Count> -->
  <!-- <Coordinate v-if="isUnmount"></Coordinate>
    <button @click="isUnmount=false">卸载Coordinate</button> -->
  <!-- <Fd></Fd> -->
  <h2>我是爷组件,我有{{ name }},价值{{ price }}W</h2>
  <!-- 展示组件还未加载完毕的样式 -->
  <Suspense>
    <!-- 默认的内容 -->
    <template v-slot:default>
      <Children></Children>
    </template>
    <!-- 默认内容没有加载完成展示的内容 -->
    <template v-slot:fallback>
      <h3>Loading......</h3>
    </template>
  </Suspense>
</template>

<script>
// import Demo from "./components/Demo.vue";
// import Count from "./components/Count/Count.vue";
// import Coordinate from "./components/Coordinate/Coordinate.vue";
// import Fd from "./components/Fd/Fd.vue";
// import Children from "./components/Relative/Children.vue";//@表示src文件夹
//定义异步组件
const Children = defineAsyncComponent(() => import("./components/Relative/Children.vue"));
import { ref, toRefs, reactive, provide, defineAsyncComponent } from "vue";
export default {
  name: "App",
  setup() {
    let isUnmount = ref(true);
    let car = reactive({
      name: "奔驰",
      price: 40
    });
    provide("car", car);
    return { isUnmount, ...toRefs(car) };
  },
  components: {
    // Demo,
    // Count,
    // Coordinate
    // Fd,
    Children
  },
}
</script>

<style>
* {
  box-sizing: border-box;
  font-family: 'Courier New', Courier, monospace;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
