<template>
  <div class="admin-container">
    <MobileStart v-if="isMobile" />
    <template v-else>
      <el-container v-if="mode === 'vertical'">
        <MenuStart :isCollapse="isCollapse" />
        <el-container class="container" :style="{ left: isCollapse ? '65px' : '240px' }">
          <el-header
            :class="{ 'header': true, fixed: fixedHead, notag: !tag }"
            height="60px"
            :style="{ left: isCollapse ? '65px' : '240px' }"
          >
            <NavBar @handleCollapse="handleCollapse" />
            <template v-if="tag">
              <TabBar />
            </template>
          </el-header>
          <el-main class="main" :class="{ fixed: fixedHead, notag: !tag }">
            <AppMain />
          </el-main>
        </el-container>
      </el-container>
      <HorizontalStart v-if="mode === 'horizontal'" />
      <el-backtop />
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const isMobile = computed(() => store.getters['setting/isMobile']) // 是否手机端

const fixedHead = computed(() => store.getters['setting/fixedHead']) // 是否固定头部

const tag = computed(() => store.getters['setting/tag']) // 是否显示标签

const isCollapse = computed(() => store.getters.collapse) // 是否折叠菜单

const mode = computed(() => store.getters['setting/mode']) // 当前布局模式

/**
 * 更改是否折叠菜单
 */
const handleCollapse = () => {
  store.dispatch('setting/changeCollapse')
}
</script>

<style lang="scss" scoped>
.admin-container {
  position: relative;
  background-color: $base-content-bg-color;
  .container {
    position: absolute;
    right: 0;
    transition: all $base-transition-time-4;
  }
  .header {
    padding: 0;
    transition: all $base-transition-time-4;
    &.fixed {
      position: fixed;
      top: 0;
      right: 0;
      z-index: $base-z-index-999;
    }
  }
  .main {
    position: relative;
    top: $base-main-vertical-top;
    overflow-y: auto;
    &.fixed {
      top: $base-main-fixed-top;
    }
    &[class="fixed el-main main notag"] {
      top: $base-main-vertical-fixed-notag-top;
    }
    &[class="el-main main notag"] {
      top: $base-main-notag-top;
    }
    background-color: $base-content-bg-color;
  }
}
</style>
