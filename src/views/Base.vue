<template>
  <div>
    <div ref="listRef">
      <ul>
        <li v-for="ele in eleList" :key="ele.id">{{ ele.name }}</li>
      </ul>
      <button @click="addEle">添加</button>
    </div>
    <div>
      <ul>
        <li v-for="ele in todoList" :key="ele.id">{{ ele.name }}</li>
      </ul>
      <button @click="addTodo">添加</button>
    </div>
    <p>通过计算属性computed，两个数组的长度是：{{ sum }}</p>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  reactive,
  onMounted,
  getCurrentInstance,
  toRefs,
  computed,
  watch,
  watchEffect
} from 'vue'
import { useRoute, useRouter } from 'vue-router'

const { proxy } = getCurrentInstance()

// 获取 ref dom
const listRef = ref(null)

onMounted(() => {
  console.log(listRef.value)
})

// ref
const eleList = ref([])
function addEle() {
  let len = eleList.value.length
  eleList.value.push({
    id: len,
    name: 'ref 自增' + len
  })
}

// reactive
const dataObj = reactive({
  todoList: []
})

// 解构
const { todoList } = toRefs(dataObj)
function addTodo() {
  let len = todoList.value.length
  todoList.value.push({
    id: len,
    name: 'reactive 自增' + len
  })
  // 调用全局方法
  proxy.$globalFunc('krry')
}

// computed
let sum = computed(() => todoList.value.length + eleList.value.length)
console.log('setup引用computed要.value：' + sum.value)

// watch
watch(
  eleList,
  (curVal, oldVal) => {
    console.log('监听器：', curVal, oldVal)
  },
  {
    deep: true
  }
)

// watchEffect
watchEffect(() => console.log('使用watchEffect监听', sum.value))

const route = useRoute() // 相当于 vue2 中的this.$route
const router = useRouter() // 相当于 vue2 中的this.$router
console.log('路由：', route, router)
</script>

<style lang="scss" scoped>
ul {
  overflow: hidden;

  li {
    float: left;
    margin-right: 10px;
    list-style: none;
  }
}

button {
  display: block;
}
</style>
