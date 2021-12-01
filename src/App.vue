<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <el-alert
    title="success"
    type="success">
  </el-alert>
  <user theme="outline" size="16" fill="#999" />
  <h2 class="desc">{{ t('login.desc') }}</h2>
  <p class="tip">{{ t('login.tip') }}</p>
  <router-view></router-view>
</template>

<script setup>
import { getResouceList } from 'api/index';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

getResouceList();
</script>

<style>
</style>
