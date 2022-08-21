<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" /> -->
  <h1>我是App组件</h1>
  <h1>一个人的信息</h1>
  <h2>姓名: {{name}} </h2>
  <h2>年龄: {{age}} </h2>
  <h2>工作: {{job.type}} </h2>
  <h2>薪资: {{job.salary}} </h2>
  <h2>业余爱好：{{`${hobby}`}}</h2>
  <button @click="introduce">介绍一下自己</button>
  <button @click="change">修改信息</button>
</template>

<script>
  //引入渲染函数
  // import {h} from "vue";
  //引入ref函数
  import { ref,reactive } from "vue";
  export default {
    name:"App",
    //setup配置
    setup() {
      let {name,age,job,hobby} = reactive({
          name:"阿修罗",
          age:20,
          job:{
            type:"前端工程师",
            salary:"20k",
          },
          hobby:["Code","FGO","甘雨"]
      })

      function introduce() {
        console.log(`你好,我叫${this.name},今年${this.age}岁.`);
      };
      function change() { 
        job.type = "UI设计师";
        job.salary = "15k";
        hobby[2] = "雷电将军";
      }
      //返回一个对象(常用)
      return {
        name,
        age,
        job,
        hobby,
        introduce,
        change,
      };
      //返回一个函数
      // return () => h("h1","Vue3.0"); //渲染函数参数:1.标签或者组件 2.内容
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
