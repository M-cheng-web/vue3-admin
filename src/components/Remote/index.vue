<template>
  <div class="remote">
    {{ mode }}
    <!-- <component class="remote-test" :is="mode" v-bind="$attrs" /> -->
  </div>
</template>

<script setup>
import { getPop } from '@/api/remote'
import { onMounted, ref } from 'vue'
import scriptLoad from '@/utils/scriptLoad'
import '../../../mock/remoteCom'

onMounted(() => {
  const a = false
  if (a) mountCom('//yun.tuia.cn/tuia/cdn/remote/rollup.js')

  getPop().then(res => {})
})

const mode = ref()

const mountCom = async (remoteUrl) => {
  // 模拟node环境
  window.module = {}
  window.exports = {}

  // 下载远程js
  await scriptLoad(remoteUrl)

  // 挂载在mode
  mode.value = window.module.exports

  // 清除
  delete window.module
  delete window.exports
}
</script>

<script>
export default {
  name: 'RemoteStrat'
}
</script>

<style scoped>
</style>
