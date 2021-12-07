<template>
  <el-scrollbar height="100vh">
    <!-- ^1.2.0-beta.4的element-plus 会有折叠消失的问题 -->
    <!-- 需要换成 1.1.0-beta.10 -->
    <el-menu
      :class="{ 'el-menu-vertical': true, 'is-black': isBlack }"
      :default-active="defaultActive"
      :background-color="menuBgColor"
      :default-openeds="defaultOpened"
      :unique-opened="uniqueOpenedFlag"
      :collapse="isCollapse"
      :text-color="textColor"
      :active-text-color="activeTextColor"
      router
      :mode="mode"
      @open="handleOpen"
      @close="handleClose"
    >
      <LogoStart v-if="isLogo" />
      <template v-for="item in routes">
        <template v-if="!item.hidden">
          <MenuItem :item="{ ...item, isBlack }" :key="item.path" />
        </template>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { setting } from '@/config/setting'
import { themeConfig } from '@/config/theme'

defineProps({
  isCollapse: { type: Boolean, default: false }, // 是否折叠菜单

  mode: { type: String, default: 'vertical' } // 布局模式
})

const { defaultOpeneds, uniqueOpened } = setting
const { themeOptions } = themeConfig
const whiteColors = ['#fff', '#ffffff', '#FFF', '#FFF', 'rgb(255, 255, 255)']
const store = useStore()
const router = useRouter()

const uniqueOpenedFlag = ref(uniqueOpened)

const theme = computed(() => store.getters['setting/theme'])

const menuBgColor = computed(() => themeOptions[theme.value].menuBgColor)

const isBlack = computed(() => whiteColors.indexOf(menuBgColor.value) === -1)

const textColor = computed(() => whiteColors.indexOf(menuBgColor.value) !== -1 ? '#333' : '#fff')

const activeTextColor = computed(() => whiteColors.indexOf(menuBgColor.value) !== -1 ? theme : '#fff')

const routes = computed(() => store.getters['routes/routes'])

const isLogo = computed(() => store.getters['setting/isLogo'])

const defaultOpened = computed(() => defaultOpeneds)

const defaultActive = computed(() => {
  const { fullPath } = router.currentRoute.value
  return fullPath || '/index'
})

const handleOpen = (key, keyPath) => {
  // console.log('open:', key, keyPath)
}

const handleClose = (key, keyPath) => {
  // console.log('close:', key, keyPath)
}
</script>

<script>
export default {
  name: 'MenuStart'
}
</script>

<style lang="scss" scoped>
.el-menu-vertical {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  @include base-scrollbar;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  &:not(.el-menu--collapse) {
    width: $base-menu-width;
  }
}
</style>
