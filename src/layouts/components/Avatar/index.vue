<template>
  <el-dropdown @command="handleCommand">
    <span class="avatar-dropdown" :style="{ color }">
      <img class="user-avatar" :src="avatar" alt="" />
      <div class="user-name">
        {{ userName }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="github">Github</el-dropdown-item>
        <el-dropdown-item command="logout" divided>{{ t("navbar.logOut") }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { ElMessageBox } from 'element-plus'
import { setting } from '@/config/setting'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
const { title, recordRoute } = setting
const { t } = useI18n()
const avatar = ref('https://i.gtimg.cn/club/item/face/img/2/15922_100.gif')
const userName = ref('Mr-cheng-web')
const store = useStore()
const router = useRouter()

defineProps({
  color: { type: String, default: '#666' }
})

const handleCommand = (command) => {
  switch (command) {
    case 'logout':
      handleLogout()
      break
    case 'github':
      window.open('https://github.com/M-cheng-web/vue3-admin')
      break
    default:
      break
  }
}

const handleLogout = () => {
  ElMessageBox.confirm(`${t('confirm.msg')}${title}？`, t('confirm.title'), {
    confirmButtonText: t('btn.confirm'),
    cancelButtonText: t('btn.cancel'),
    dangerouslyUseHTMLString: true,
    type: 'warning'
  }).then(async () => {
    await store.dispatch('user/logout')
    router.push(recordRoute ? `/login?redirect=${router.currentRoute._value.fullPath}` : '/login')
  }).catch(() => { })
}
</script>

<script>
export default {
  name: 'AvatarStart'
}
</script>

<style lang="scss" scoped>
.avatar-dropdown {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
  height: $base-avatar-dropdown-height;
  padding: $base-padding-10;
  .user-avatar {
    width: $base-avatar-widht;
    height: $base-avatar-height;
    cursor: pointer;
    border-radius: $base-border-radius-circle;
  }

  .user-name {
    position: relative;
    margin-left: $base-margin-5;
    margin-left: $base-margin-5;
    cursor: pointer;
  }
}
</style>
