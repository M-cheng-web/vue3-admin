<template>
  <el-config-provider :locale="localLanguage">
    <el-scrollbar height="100vh" ref="scroll">
      <router-view></router-view>
    </el-scrollbar>
  </el-config-provider>
  <!-- <el-alert title="success" type="success"> </el-alert>
  <user theme="outline" size="16" fill="#999" />
  <h2 class="desc">{{ t('login.desc') }}</h2>
  <p class="tip">{{ t('login.tip') }}</p> -->
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

<style></style>
