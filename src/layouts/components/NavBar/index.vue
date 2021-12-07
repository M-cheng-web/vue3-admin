<template>
  <div class="nav-bar-container">
    <!-- :gutter="15" -->
    <el-row>
      <el-col :xs="4" :sm="12" :md="12" :lg="12" :xl="12" v-if="settings.mode !== ''">
        <div class="left-panel">
          <component
            :title="collapse ? t('navbar.unfold') : t('navbar.fold')"
            class="icon-hover fold"
            :is="collapse ? 'menu-fold-one' : 'menu-unfold-one'"
            theme="filled"
            size="16"
            :strokeWidth="4"
            fill="#666"
            @click="handleCollapse"
          />
          <!-- 面包屑 -->
          <template v-if="isBreadcrumb">
            <BreadcrumbStart class="hidden-xs-only" />
          </template>
        </div>
      </el-col>
      <el-col :xs="20" :sm="12" :md="12" :lg="12" :xl="12">
        <!-- 右侧操作栏 -->
        <RightPanel />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { defineEmits, computed } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const store = useStore()

const collapse = computed(() => store.getters.collapse)

const isBreadcrumb = computed(() => store.getters['setting/isBreadcrumb']) // 是否显示面包导航

const settings = computed(() => store.getters['setting/settings'])

const emit = defineEmits(['handleCollapse'])

const handleCollapse = () => {
  emit('handleCollapse')
}
</script>

<script>
export default {
  name: 'NavBar'
}
</script>

<style lang="scss" scoped>
.nav-bar-container {
  position: relative;
  height: $base-nav-bar-height;
  padding-right: $base-padding;
  overflow: hidden;
  user-select: none;
  background: $base-color-white;
  box-shadow: $base-box-shadow;
  .left-panel {
    display: flex;
    align-items: center;
    justify-items: center;
    height: $base-nav-bar-height;
    .fold-unfold {
      color: $base-color-gray;
      cursor: pointer;
    }
    .fold {
      padding: $base-padding-20-10;
    }
    :deep(.breadcrumb-container) {
      margin-left: $base-margin-10;
    }
  }
}
</style>
