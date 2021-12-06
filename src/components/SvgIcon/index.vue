<template>
  <svg :class="svgClass" v-bind="$attrs" :style="{ 'font-size': size, color: color }">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true }, // 图标名

  color: { type: String, default: '' }, // 颜色

  size: { type: String, default: '14px' } // 大小
})

const iconName = computed(() => `#icon-${props.name}`)
const svgClass = computed(() => {
  if (props.name) {
    return `svg-icon icon-${props.name}`
  }
  return 'svg-icon'
})
</script>

<style lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: middle;
  fill: currentColor;
}
</style>
