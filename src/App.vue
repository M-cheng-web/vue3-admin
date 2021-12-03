<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <el-alert title="success" type="success"> </el-alert>
  <user theme="outline" size="16" fill="#999" />
  <h2 class="desc">{{ t('login.desc') }}</h2>
  <p class="tip">{{ t('login.tip') }}</p>
  <router-view></router-view>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { getResouceList } from 'api/index'

const { t } = useI18n()
getResouceList()
const a = new Promise((resolve) => {
  console.log(123)
  resolve()
})
console.log(a)
</script>

<style></style>
