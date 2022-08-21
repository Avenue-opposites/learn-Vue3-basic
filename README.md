# Vue3.0
* 关于Vue3带来了什么
    1. 性能的提升
        - 打包减小41%
        - 初次渲染快55%,更新渲染快133%
        - 内存减少54%
    2. 源码的升级
        - 使用Proxy代替defindProperty实现响应式
        - 重新虚拟DOM的实现和Tree-shaking
            - Tree-shaking:
                - Tree Shaking是 JavaScript 上下文中常用的一个术语，用于描述删除死代码。
    3. 拥抱TypeScript
        - Vue3更好的支持TypeScript
    4. 新的特性
        - Composition(组合) API
            - setUp配置
            - ref与reactive
            - watch与watchEffect
            - provide(提供)与inject(注入)
            - ......
    5. 新的内置组件
        - Fragment(片段)
        - Teleport(传送)
        - Suspense(暂记)
    6. 其他改变
        - 新的声明周期钩子
        - data配置项必须为一个函数,返回一个对象
        - 移除keyCode支持作为v-on的修饰符
* Vue3创建项目的两种方式
    1. vue-cli
        - vue-cli基于webpack打造,生产环境和开发环境都是基于 Webpack 打包。
        - 特点:
            - Vue CLI 基于 Webpack 构建，配置好了打包规则
            - 内置热模块重载的开发服务器
            - 有丰富的官方插件合集，站在 webpack 庞大的社区资源上
            - 友好的图形化创建和管理 Vue 项目界面
        - 创建项目:
            1. 运行 vue create 项目名称
        - 如果出现template标签之前报错,就在package.json文件中找到babel配置中的parserOptions配置项,添加"requireConfigFile":false
    2. vite
        - Vite 是基于原生 ES6 Modules 打造,在生产环境下打包使用的是 Rollup,打包方式也是基于源代码打包
        - Vite 在开发环境下，基于原生 ES6 ,无需对代码进行打包,浏览器可以直接调用。所以 Vite 因为基于浏览器的原生功能，省掉了打包过程,在开发环境中体验及其愉快。
        - 特点:
            - 依赖:大多为在开发时不会变动的纯 JavaScript。一些较大的依赖（例如有上百个模块的组件库）处理的代价也很高。依赖也通常会存在多种模块化格式。Vite 会使用 esbuild 预构建依赖。esbuild 使用 Go 编写，并且比以 JavaScript 编写的打包器预构建依赖快 10-100 倍。
            - 源码：通常包含一些并非直接是 JavaScript 的文件，需要转换，时常会被编辑。同时，并不是所有的源码都需要同时被加载（例如基于路由拆分的代码模块）。
            - 轻量快速的热重载(HMR)
            - 真正的按需编译,不再等待整个应用编译完成
        - 创建项目
            1. 运行 npm create vite@latest ,创建vite项目
            2. 设置项目名称
            3. 选择开发框架
            4. 运行 cd 项目名称 ,跳转到项目目录
            5. 运行 npm install ,安装依赖包
            6. 运行 npm run dev ,运行开发服务器
* Vue3中的变化
    - <template>中可以不用必须添加根标签了
    - 使用createApp创建
    - data,methods都配置在setup中
* Composition(组合式) API
    - setup:
        - setup是Vue3新的配置项,值为一个函数
        - setup是所有组合式API"表演的舞台"
        - 组件中所有用到的数据,方法,生命周期等等,都需要配置在setup中 
        - 参数:
            1. props:包含props配置项以及声明接收的属性
            2. context(上下文对象)
                1. attrs:值为对象,接收由组件外部传入,但没有在props中声明接收的属性,相当于this.$attrs
                2. slots:值为对象,接收传入的插槽,相当于this.$slots
                3. emit:值为函数,分发自定义事件的函数,相当于this.$emit
        - setup的两种返回值:
            1. 若返回一个对象,则对象中的属性和方法,在模板中均可以使用(常用)
            2. 若返回一个渲染函数,则可以自定义渲染内容(了解)
        - 使用setup需要注意的地方:
            - setup在beforeCreate之前执行一次,this是undefined
            - Vue2中的配置中this可以读取Vue3中的数据和方法,但是Vue3中的this读取不了Vue2中的数据和方法,所以在Vue3中可以使用Vue2语法,但是不要混着用
            - 当Vue3配置中的数据和方法和Vue2配置中的数据和方法产生冲突时,会以Vue3的配置为主
            - 尽量不要在setup中使用this
            - setup不能是一个async函数
    - setup的生命周期钩子:
        - beforeCreate ===> setup()
        - create ===> setup()
        1. beforeMount ===> onBeforeMount
        2. mounted ===> onMounted
        3. beforeUpdate ===> onBeforeUpdate 
        4. updated ===> onUpdated
        5. beforeUnmount ===> onBeforeUnmont
        6. unmounted ===> onUnmounted
        - 注意:组合式生命周期钩子的优先级比普通生命周期的优先级高
    - Composition API的优势
        - 可以优雅的把相关功能的代码组合在一起
* ref函数:
        - 一般给基本数据类型使用
        - ref函数可以将一个变量变成响应式数据,其返回值为一个RefImpl的实例对象,全拼为[Reference(引用)+implement(实现)]
        - 该对象的基本数据类型响应式数据可以通过它的value属性获取
        - 关于参数的类型:
            1. 基本数据类型创建并会返回一个引用对象的实例,通过Object.defindProperty实现响应式,使用它的value属性就可以访问(推荐)
            2. 引用数据类型创建一个引用对象实例,并调用reactive方法返回一个由Proxy代理的普通对象,通过ES6的Proxy实现响应式,使用普通对象的访问形式即可
        - 语法:
            - ref(数据)
* reactive(响应)函数：
    - 把一个对象类型的数据变成响应式,内部由ES6的Proxy实现,通过代理对象操作源对象的数据和行为 
    - reactive的响应式是深层次的
    - 参数:对象或者数组,返回Proxy实例对象
    - 语法:
        - reactive(对象||数组)
* computed函数
    - 和计算属性一样
    - 简写形式:
        //只有getter
        computed(() => {return 值});
    - 完整形式
        computed({
            get() {
                    return 值;
            },
            set(value) {
                    
            }
        })
* watch(侦听器)
    - 从配置项,变为组合式API函数
    - 注意:
        1. 监视reactive定义的响应式数据,无法获取到oldValue,因为它指向newValue
        2. 强制开启深度监视(deep配置无效)
        3. 监视reactive对象的数据,参数一必须写成函数,并返回需要监视的值,多个值就返回数组
        4. 监视reactive定义的响应式数据的中的引用类型数据中的某些属性,需要开启深度监视,但是新值和旧值一样
        5. 如果监视使用ref函数的对象响应式数据,可以使用deep配置,监视深度的数据,因为ref返回的是ref引用对象,而reactive函数返回的是Proxy是实例对象,对于Proxy的实例对象默认强制深度监视
    - 参数:
        1. 监听的数据
        2. 监听回调
        3. 监听的配置对象
    - 语法:
        - watch(string|array,(newValue,oldValue) => {
            //一些代码......
        },{immediate:true,deep:true});
* watchEffect
    - 立即执行传入的一个函数，同时响应式追踪其依赖(就是在该函数中使用了哪些依赖的数据)，并在其依赖变更时重新运行该函数。
    - 参数:callback
    - 语法: watchEffect(() => {//一些代码...});
* lifeCycry(生命周期钩子)
    - 一般生命周期: 
        1. beforeCreate(创建之前)
            - 在实例初始化之后、进行数据侦听和事件/侦听器的配置之前同步调用。 
        2. created(创建完毕)
            - 在实例创建完成后被立即同步调用,在此阶段数据侦听,计算属性等等都以配置完毕,然而挂载还未开始
        3. beforeMount(挂载之前)
            - 在挂载开始之前被调用：相关的 render 函数首次被调用。
            - 注意:该钩子在服务器端渲染期间不被调用。
        4. mounted(挂载完毕)
            - 在实例挂载完成后被调用,这时候传递给 app.mount 的元素已经被新创建的 vm.$el 替换了
            - 注意:mounted 不会保证所有的子组件也都被挂载完成。如果你希望等待整个视图都渲染完毕，可以在 mounted 内部使用 vm.$nextTick
            - 该钩子在服务器端渲染期间不被调用。
        5. beforeUpdate(更新之前)
            - 在数据发生改变后，DOM 被更新之前被调用。这里适合在现有 DOM 将要被更新之前访问它，比如移除手动添加的事件监听器。
            - 注意:该钩子在服务器端渲染期间不被调用，因为只有初次渲染会在服务器端进行。
        6. updated(更新完毕)
            - 在数据更改导致的虚拟 DOM 重新渲染和更新完毕之后被调用。
            - 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作
            - 注意，updated 不会保证所有的子组件也都被重新渲染完毕。如果你希望等待整个视图都渲染完毕，可以在 updated 内部使用 vm.$nextTick
            - 该钩子在服务器端渲染期间不被调用。
        7. beforeUnmount(卸载之前)
            - 在卸载组件实例之前调用。在这个阶段，实例仍然是完全正常的,一些配置可以正常使用
            - 注意:该钩子在服务器端渲染期间不被调用。
        8. unmounted(卸载完毕)
            - 卸载组件实例后调用。调用此钩子时，组件实例的所有指令都被解除绑定，所有事件侦听器都被移除，所有子组件实例被卸载。
            - 注意:该钩子在服务器端渲染期间不被调用。
    - 特殊生命周期:
        - activated(激活)
            - 被 keep-alive 缓存的路由组件激活时调用。
            - 注意:该钩子在服务器端渲染期间不被调用。
        - deactiveated(失活)
            - 被 keep-alive 缓存的组件失活时调用。
            - 注意:该钩子在服务器端渲染期间不被调用。
        - errorCaptured(错误捕获)
            - 在捕获一个来自后代组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 false 以阻止该错误继续向上传播。
            - tips:
                你可以在此钩子中修改组件的状态。因此在捕获错误时，在模板或渲染函数中有一个条件判断来绕过其它内容就很重要；不然该组件可能会进入一个无限的渲染循环。
        - renderTracked(渲染跟踪)
            - 跟踪虚拟 DOM 重新渲染时调用。钩子接收 debugger event 作为参数。此事件告诉你哪个操作跟踪了组件以及该操作的目标对象和键。
        - renderTriggered(渲染触发)
            - 当虚拟 DOM 重新渲染被触发时调用。和 renderTracked 类似，接收 debugger event 作为参数。此事件告诉你是什么操作触发了重新渲染，以及该操作的目标对象和键。
* 自定义hook(钩子)函数
    - 什么是hook?
        - 本质是一个函数,把setup函数值使用的Composition API进行了封装
    - 类似于Vue2中的mixin
    - 自定义hook的优势:复用代码,让setup中的逻辑更清晰易懂
* toRef()方法
    - 创建一个ref的引用实例对象,使其value属性指向另一个对象的某个属性
    - 应用场景:要将响应式对象中的某个属性单独提供给外部使用
    - 参数:
        1. 目标对象
        2. 键名
    - 返回值:一个objectrRefimpl的实例对象,使其value属性指向目标对象对应的键值,修改该对象的value会更新目标对象的对应属性
    - 语法:
        - toRef(target,key)
* toRefs()方法
    - 创建一个ref的引用实例对象,使其value属性指向另一个对象
    - 应用场景:要将响应式对象中的所有属性单独提供给外部使用
    - 参数:
        1. 目标对象
    - 返回值:一个objectrRefimpl的实例对象,里面包含目标对象所有的属性,其他的和toRef一样,返回时可以使用...运算符展开
    - 语法:
        toRefs(target)
* shallowReactive()方法
    - 创建一个响应式代理，它跟踪其自身 property 的响应性，但不执行嵌套对象的深层响应式转换 (暴露原始值)。
    - 只考虑对象最外层数据的响应式
    - 应用场景:如果有一个对象类型的数据,结构比较深,但是只有最外层的数据发生变化,就可以使用
    - 语法:
        - shallowReactive(data);
* shallowRef()方法
    - 只能处理基本类型数据的响应式,不会处理引用类型数据的响应式
    - 参数本身为响应式,但内部的值不是
    - 应用场景:如果有一个对象类型的数据,后续功能不会修改该对象的属性而是生成新的对象,就可以使用
    - 语法:
        - shallowRef(data);
* readonly()方法
    - 接受一个对象 (响应式或纯对象) 或 ref 并返回原始对象的只读代理。只读代理是深层的：任何被访问的嵌套 property 也是只读的。
    - 深只读
    - 语法:
        - readonly(data);
* shallowReadonly()方法
    - 创建一个 proxy，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换 (暴露原始值)
    - 浅只读
    - 语法:
        - shallowReadonly(data)
* toRaw()方法
    - 返回 reactive 或 readonly 代理的原始对象。这是一个“逃生舱”，可用于临时读取数据而无需承担代理访问/跟踪的开销，也可用于写入数据而避免触发更改。不建议保留对原始对象的持久引用。请谨慎使用。
    - 应用场景:用于读取响应式对象对应的源对象,对这个对象的操作,不会引起页面更新,因为源对象不具备响应式
    - 语法:
        - toRaw(data);
* markRaw()方法
    - 标记一个对象，使其永远不会转换为 proxy。返回对象本身。
    - 应用场景:
        1. 有些值不应该被设置为响应式,例如第三方库类
        2. 当渲染具有不可变数据的大列表时,跳过响应式提高性能
    - 语法:
        - markRaw(data);
* customRef()方法
    - 创建一个自定义的ref,并对其依赖项的跟踪以及更新触发的显式控制
    - 有依赖读取时调用getter,修改数据是调用setter
    - 参数:
        1. callback(track,trigger)
        - track:用于通知Vue追踪数据
        - trigger:用于通知Vue更新依赖,重新解析模板
    - 返回值:一个对象,必须包含getter和setter
    - 语法:
        function myRef(value) {
            return customRef((track,trigger) => {
                return {
                    get() {
                        track();//通知Vue追踪数据的变化
                        return value;
                    },
                    set(newValue) {
                        value = newValue;
                        trigger();//通知依赖更新
                    }
                }
            });
        }
* provide(提供)与inject(注入)
    - 作用:实现父组件与后代组件间通信
    - 使用:爷组件有一个provide配置项提供数据,孙组件有一个inject配置项接收数据
    - provide()方法
        - 为后代组件提供依赖
        - 参数:
            1. 自定义键值
            2. 数据
        - 语法:
            provide("key",data);
    - inject()方法
        - 注入提供的依赖
        - 参数:
            1. 键值
        - 返回值:根据键值获取的依赖
        - 语法:
            inject("key")
* 响应式数据的判断
    - isRef()方法
        - 检查一个值是否为ref对象
    - isReactive()方法
        - 检查一个对象是否为reactive创建的响应式代理对象
    - isReadonly()方法
        - 检查一个对象是否为readonly创建的只读代理
    - isProxy()方法
        - 检查一个对象是否是由reactive或者是readonly方法创建的代理
* Fragment
    - 在Vue2中,组件必须有根标签
    - 在Vue3中,可以不用写根标签,因为Vue内部会将所有标签包含在一个Fragment的虚拟元素中
    - 好处:减少标签层级,减小内存占用
* Teleport
    - 可以将一个组件内的结构在使用时依照指定结构设置
    - 语法: 
        <Teleport to="传送到哪个元素下">
            //指定内容
        </Teleport>
* Suspense  
    - 可以给异步加载组件设置未加载完成时展示的内容
    - 使用之后可以让setup返回一个Promise对象
    - 语法:
        - <Suspense>
            <template slot:default>
                需要加载的正式内容
            </template>
            <template slot:fallback>
                在正式内容加载之前使用的内容
            </template>
        </Suspense>