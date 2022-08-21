<template>
    <button @click="isShow = true">点我弹个窗</button>
    <teleport to="body">
        <div v-if="isShow" class="cover">
            <div class="dialog">
                <h2>你好啊!</h2>
                <h3>摩根</h3>
                <h3>杀狐</h3>
                <h3>奥伯龙</h3>
                <h3>妖兰</h3>
                <h3>暗狐</h3>
                <button @click="isShow = false">关闭</button>
            </div>
        </div>
    </teleport>
</template>

<script>
import { ref } from "vue";
export default {
    name: "Dialog",
    setup(porps, ctx) {
        let isShow = ref(false);
        return {
            isShow,
        }
    }
}
</script>

<style scoped>
.cover {
    position: absolute;
    height: 100vh;
    width: 100%;
    left: 0;
    top: 0;
    backdrop-filter: blur(4px);
    background-color: rgba(0, 0, 0, 0.5);
}

.dialog {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    width: 300px;
    height: 300px;
    background-color: rgb(216, 197, 197);
    padding: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align-last: center;
}

.enter-active {
    opacity: 1;
}

;

.leave-active {
    opacity: 0;
}

.dialog button {
    width: 50px;
    align-self: flex-end;
}
</style>