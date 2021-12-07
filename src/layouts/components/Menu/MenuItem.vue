<template>

  <!-- 单独菜单的 -->
  <el-menu-item
    v-if="!item.meta || !item.children"
    :key="item.path"
    :index="item.children ? item.children[0].path : item.path"
  >
    <component
      v-if="item.children ? item.children[0].meta.icon : item.meta.icon"
      class="menu-icon"
      theme="outline"
      size="14"
      strokeWidth="3"
      :is="item.children ? item.children[0].meta.icon : item.meta.icon"
    />
    <template #title>
      <span class="title">
        {{ item.children ? item.children[0].meta.title : item.meta.title }}
      </span>
    </template>
  </el-menu-item>

  <!-- 有子菜单的 -->
  <el-sub-menu :class="{ 'is-black': isBlack }" :index="item.path" v-else>
    <template #title>
      <component
        v-if="item.meta.icon"
        class="menu-icon"
        theme="outline"
        size="14"
        strokeWidth="3"
        :is="item.meta.icon"
      />
      <span class="title">{{ item.meta.title }}</span>
    </template>
    <template v-for="(option, index) in item.children">
      <menu-item v-if="option.children" :key="option.path" :item="option" />
      <el-menu-item v-else :index="option.path" :key="index">
        <component
          class="menu-icon"
          v-if="option.meta.icon"
          theme="outline"
          size="14"
          strokeWidth="3"
          :is="option.meta.icon"
        />
        <span class="title">
          {{ option.meta.title }}
        </span>
      </el-menu-item>
    </template>
  </el-sub-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { themeConfig } from '@/config/theme'

defineProps({
  item: { type: Object, default: () => {} }
})

const store = useStore()
const { themeOptions } = themeConfig
const whiteColors = ['#fff', '#ffffff', '#FFF', '#FFF', 'rgb(255, 255, 255)']

const theme = computed(() => store.getters['setting/theme'])
const menuBgColor = computed(() => themeOptions[theme.value].menuBgColor)
const isBlack = computed(() => whiteColors.indexOf(menuBgColor.value) === -1)
</script>

<script>
export default {
  name: 'MenuItem'
}
</script>

<style lang="scss" scoped>
.menu-icon,
.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: $base-icon-width-big !important;
  height: $base-icon-height-super-max !important;
  margin-right: $base-margin-5;
  visibility: initial !important;
}
</style>
