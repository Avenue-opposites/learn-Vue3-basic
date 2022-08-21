<template>
    <h2>当前求和为:{{ sum }}</h2>
    <button @click="sum++">加1</button>
    <hr>
    <h2>{{ msg }}</h2>
    <button @click="msg += '!'">修改</button>
    <hr>
    <h2>{{ name }}的信息</h2>
    <h3>姓名:{{ name }}</h3>
    <h3>年龄:{{ age }}年</h3>
    <h3>职业:{{ job.type }}</h3>
    <h3>薪资:{{ job.salay }}K</h3>
    <h3 v-show="person.phone">手机信息:{{person.phone}}</h3>
    <button @click="name = '美露莘'">解放真名</button>
    <br>
    <button @click="age += 10">增加年龄</button>
     <br>
    <button @click="job.salay += 10">加薪</button>
     <br>
    <button @click="job.type = '老婆'">跳槽</button>
     <br>
    <button @click="addIphone">添加手机</button>
    <br>
    <button @click="person.phone.name = 'iPhone 12'">降级</button>
    <br>
    <button @click="showRaw(person)">原始数据</button>
</template>

<script>
import { ref, toRef, toRefs, watch, reactive,toRaw,markRaw } from "vue";
export default {
    name: "Count",
    setup() {
        //定义数据
        let sum = ref(0);
        let msg = ref("哈哈哈");
        let person = reactive({
            name: "[妖精骑士]兰斯洛特",
            age: 10000,
            job: {
                type: "骑士",
                salay: 100,
            }
        });

        //将数据设为只读
        // sum = readonly(sum);
        // person = shallowReadonly(person);

        //立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。
        // watchEffect(() => {
        //     console.log(`watchEffect回调执行`,sum.value);
        // });

        //#region 
        //定义一个监视器,监视ref定义的一个响应式数据
        // watch(sum,(newValue,oldValue) => {
        //     console.log(newValue,oldValue);
        // });

        // 监视ref定义的多个响应式数据
        // watch([sum,msg],(newValue,oldValue) => {
        //     console.log(newValue,oldValue);
        // },{immediate:true,deep:true});

        //监视reactive定义的响应式数据
        //无法获取到oldValue,因为它指向newValue
        //强制开启深度监视(deep配置无效)
        // watch(person,(newValue,oldValue) => {
        //     console.log(newValue,oldValue);
        // },{deep:false});

        //监视reactive定义的响应式数据的某一个属性
        // watch(() => person.name,(newValue,oldValue) => {
        //      console.log(newValue,oldValue);
        // });

        //监视reactive定义的响应式数据的某些属性
        // watch(() => [person.name,person.age],(newValue,oldValue) => {
        //      console.log(newValue,oldValue);
        // });

        //监视reactive定义的响应式数据的中的引用类型数据中的某些属性,需要开启深度监视,但是新值和旧值一样
        //  watch(() => person.job,(newValue,oldValue) => {
        //      console.log(newValue,oldValue);
        // },{deep:true});
        //#endregion
        function showRaw(data) {
            const raw = toRaw(data);
            console.log(raw);
        };
        function addIphone() {
            const iphone = {name:"iPhone 13",handler:"A15"};
            person.phone = markRaw(iphone);
        }
        return {
            sum,
            msg,
            person,
            // name:toRef(person,"name"),
            ...toRefs(person),
            showRaw,
            addIphone
        }
    }
}
</script>

<style>
</style>