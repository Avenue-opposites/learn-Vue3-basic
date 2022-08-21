<template>
    <h1>我是App组件</h1>
    <h1>一个人的信息</h1>
    <h2>姓名: {{ person.fullName }} </h2>
    <h2>年龄: {{ person.age }} </h2>
    <slot name="sex"></slot>
    <h2>工作: {{ person.job.type }} </h2>
    <h2>薪资: {{ person.job.salary }} </h2>
    <h2>业余爱好：{{ `${person.hobby}` }}</h2>
    <h2>msg：{{ msg }}</h2>
    <button @click="introduce">介绍一下自己</button>
    <button @click="change">修改信息</button>
    <button @click="hello">hello</button>
    <p>
        姓:<input type="text" v-model="person.firstName">
    </p>
     <p>
        名:<input type="text" v-model="person.lastName">
    </p>
</template>

<script>
//引入渲染函数
// import {h} from "vue";
//引入ref函数
import { ref, reactive,computed } from "vue";
export default {
    name: "Demo",
    props: ["msg"],
    emits:["hello"],
    //setup配置
    setup(props, context) {
        let person = reactive({
            firstName:"李",
            lastName:"二",
            age: 20,
            job: {
                type: "前端工程师",
                salary: "20k",
            },
            hobby: ["Code", "FGO", "甘雨"]
        });
        person.fullName = computed({
            get() {
                return person.firstName+"-"+person.lastName;
            },
            set(value) {
                let arr = value.split("-");
                person.firstName = arr[0];
                person.lastName = arr[1];
            }
        });
        console.log("setup执行");
        //   console.log(props,context);
        console.log(context.slots);
        function hello() {
            context.emit("hello",name);
        };
        function introduce() {
            console.log(`你好,我叫${this.person.name},今年${this.person.age}岁.`);
        };
        function change() {
            person.fullName = "阿-修罗";
            person.job.type = "UI设计师";
            person.job.salary = "15k";
            person.hobby[2] = "雷电将军";
        }
        //返回一个对象(常用)
        return {
            // firstName,
            // lastName,
            // age,
            // job,
            // hobby,
            // fullName,
            person,
            introduce,
            change,
            hello
        };
        //返回一个函数
        // return () => h("h1","Vue3.0"); //渲染函数参数:1.标签或者组件 2.内容
    },
    beforeCreate() {
        console.log("beforeCreate执行");
    }
}
</script>

<style>
</style>