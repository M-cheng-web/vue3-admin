<template>
  <el-breadcrumb class="breadcrumb-container" separator=">">
    <el-breadcrumb-item v-for="item in list" :key="item.path">
      <component
        class="menu-icon"
        v-if="item.meta.icon"
        theme="outline"
        size="14"
        strokeWidth="3"
        :is="item.meta.icon"
      />
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const list = computed(() => {
  const { matched } = router.currentRoute.value
  return matched.filter((item) => item.name && item.meta.title)
})
</script>

<script>
export default {
  name: 'BreadcrumbStart'
}
</script>

<style lang="scss" scoped>
.breadcrumb-container {
  display: flex;
  align-items: center;
  :deep(.el-breadcrumb__inner, .el-breadcrumb__item) {
    display: inline-flex;
    align-items: center;
    margin: 1px;
  }
  .menu-icon {
    padding-right: 5px;
  }
}
</style>
