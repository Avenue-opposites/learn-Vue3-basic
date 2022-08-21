import { reactive,onMounted,onBeforeUnmount } from "vue";
export default function() {
    //创建响应式坐标对象
    const point = reactive({
        x:0,
        y:0
    });
    //定义鼠标移动的回调
    let getCoordinate = (event) => {
        point.x = event.offsetX;
        point.y = event.offsetY;
        console.log(point.x,point.y);
    };
    //在挂载完毕时document添加鼠标点击事件获取最新坐标
    onMounted(() => {
        document.addEventListener("click",getCoordinate);
    });
    //在卸载之前移除document鼠标点击事件
    onBeforeUnmount(() => {
        document.removeEventListener("click",getCoordinate);
    });
    return point;
};