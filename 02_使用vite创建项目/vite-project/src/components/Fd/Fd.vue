<template>
  <input type="text" v-model.trim="keyWord">
  <h1>关键字:{{keyWord}}</h1>
</template>

<script>
import { ref,customRef } from "vue";
export default {
    name:"Fd",
    setup() {
        // let keyWord = ref("");//使用Vue提供的ref函数
        let keyWord = myRef("我是自定义ref",500);
        //自定义ref函数
        function myRef(value,delay) {
            return customRef((track,trigger) => {
                let timer;
                return {
                    get() {
                        track();//通知Vue追踪数据的变化
                        return value;
                    },
                    set(newValue) {
                        if(timer) {
                            clearInterval(timer);
                        }
                        timer = setTimeout(() => {//延迟更新
                            value = newValue;
                            trigger();//通知依赖更新
                        }, delay);
                    }
                }
            });
        }
        return {
            keyWord
        }
    }
}
</script>

<style>

</style>