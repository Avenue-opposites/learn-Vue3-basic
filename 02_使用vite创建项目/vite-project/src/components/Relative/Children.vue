<template>
  <h3>我是子组件,{{sum}}</h3>
  <Grandson></Grandson>
</template>

<script>
import { ref } from "vue";
import Grandson from "./Grandson.vue";
export default {
    name:"Children",
    components: {
        Grandson
    },
    setup() {
      let sum = ref(0);
      // let p = new Promise((resolve,reject) => {
      //     setTimeout(() => {
      //       resolve(sum);
      //     }, 1000);
      // });
      return {sum};
    }
}
</script>

<style>

</style>