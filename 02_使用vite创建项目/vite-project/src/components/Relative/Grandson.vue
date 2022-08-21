<template>
    <h4>我是孙组件,我有{{name}},价值{{price}}W.</h4>
    <Dialog></Dialog>
</template>

<script>
import { inject,toRefs } from "vue";
import Dialog from "../Dialog.vue";
export default {
    name:"Grandson",
    components: {
        Dialog
    },
    setup() {
        let car = inject("car");
        // console.log(car);
        return {
            ...toRefs(car)
        }
    }
}
</script>

<style>

</style>