<template>
  <span class="icon-hover full-screen-wrapper" :title="isFullScreen ? t('navbar.noFull') : t('navbar.full')">
    <component
      theme="filled"
      size="16"
      :fill="color"
      :strokeWidth="4"
      :is="(isFullScreen ? 'off' : 'full') + '-screen'"
      @click="handleClick"
    />
  </span>
</template>

<script setup>
import { defineEmits, computed } from 'vue'
import screenfull from 'screenfull'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

defineProps({
  color: { type: String, default: '#666' }
})

const store = useStore()
const { t } = useI18n()
const emit = defineEmits(['refresh'])

const isFullScreen = computed(() => store.getters['setting/isFullScreen'])
const handleClick = () => {
  if (!screenfull.isEnabled) {
    ElMessage.warning('进入全屏失败')
    return false
  }
  store.dispatch('setting/changeFullScreen', !isFullScreen.value)
  screenfull.toggle()
  emit('refresh', screenfull.isFullscreen)
}
</script>

<style lang="scss" scoped>
.full-screen-wrapper {
  padding: 20px 10px;
}
</style>
