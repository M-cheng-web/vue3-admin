<template>
  <el-config-provider :locale="localLanguage">
    <el-scrollbar height="100vh" ref="scroll">
      <router-view></router-view>
    </el-scrollbar>
  </el-config-provider>
</template>

<script setup>
import { onMounted, computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import i18n from '@/locales'

const locale = i18n.global.locale
const store = useStore()
const router = useRouter()
const scroll = ref(null)

// 语言包(中文/英文)
const localLanguage = computed(() => {
  return i18n.global.messages[locale]
})

// 页面挂载后判断当前是手机端还是PC
onMounted(() => {
  changeBodyWidth()
  window.addEventListener('resize', changeResize)
})

// 监听路由变化,当路由变化时滚动到顶部
watch(
  () => router.currentRoute.value,
  () => {
    scroll.value.setScrollTop(0)
  }
)

const changeBodyWidth = () => {
  const flag = document.body.getBoundingClientRect().width - 1 < 992
  store.dispatch('setting/changeMobile', flag)
}

const changeResize = () => {
  changeBodyWidth()
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: $base-font-size-default;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
