<template>
    <h2>当前鼠标的坐标[X:{{point.x}},Y:{{point.y}}]</h2>
</template>

<script>
import usePoint from "../../hooks/usePoint";
export default {
    name:"Coordinate",
    setup(props,context) {
        const point = usePoint();
        //返回数据
        return {
            point
        }
    }
}
</script>

<style>

</style>