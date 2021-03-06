<template>
  <el-form :model="ruleForm" :rules="rules" ref="validateForm" class="login-ruleForm">
    <!-- 账号 -->
    <el-form-item prop="username">
      <el-input :placeholder="t('login.username')" v-model="ruleForm.username">
        <template #prefix>
          <user theme="outline" size="16" fill="#999" />
        </template>
      </el-input>
    </el-form-item>

    <!-- 密码 -->
    <el-form-item prop="password">
      <el-input
        @keyup.enter="handleLogin"
        :placeholder="t('login.password')"
        type="password"
        v-model="ruleForm.password"
      >
        <template #prefix>
          <lock theme="outline" size="16" fill="#999" />
        </template>
      </el-input>
    </el-form-item>

    <!-- 记住密码 / 忘记密码 -->
    <el-form-item>
      <div class="login-check">
        <el-checkbox v-model="checkedPwd">{{ t("login.rememberPwd") }}</el-checkbox>
        <el-button type="text">{{ t("login.forgotPwd") }}</el-button>
      </div>
    </el-form-item>

    <!-- 登录按钮 -->
    <el-form-item>
      <el-button type="primary" size="medium" :loading="loading" class="login-btn" round @click="handleLogin">
        {{ t("login.loginBtn") }}
      </el-button>
    </el-form-item>

    <!-- 第三方登录 -->
    <el-divider>{{ t("login.thirdparty") }}</el-divider>
    <el-form-item>
      <div class="login-methods">
        <wechat theme="outline" size="24" fill="#333" />
        <alipay theme="outline" size="24" fill="#333" />
        <github theme="outline" size="24" fill="#333" />
        <twitter theme="outline" size="24" fill="#333" />
        <google theme="outline" size="24" fill="#333" />
      </div>
    </el-form-item>

    <!-- 账户提示 -->
    <div style="font-size: 16px">
      共有三个权限用户: admin,editor,visitor(密码随便填)
    </div>
  </el-form>
</template>

<script>
import { reactive, toRefs, ref, unref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

export default {
  name: 'LoginForm',
  setup () {
    const { t } = useI18n()
    const store = useStore()
    const router = useRouter()
    const validateForm = ref(null)
    const state = reactive({
      ruleForm: {
        username: 'admin',
        password: 'admin'
      },
      loading: false,
      checkedPwd: false,
      redirect: undefined,
      rules: {
        username: [{ required: true, message: t('login.rules.username'), trigger: 'blur' }],
        password: [{ required: true, message: t('login.rules.password'), trigger: 'blur' }]
      }
    })

    watch(
      () => router.currentRoute,
      ({ _value }) => {
        const route = _value
        state.redirect = (route.query && route.query.redirect) || '/'
      },
      { immediate: true }
    )

    const handleLogin = () => {
      const form = unref(validateForm)
      if (!form) return

      form.validate((valid) => {
        if (valid) {
          state.valid = true
          state.loading = true
          store.dispatch('user/login', state.ruleForm).then(() => {
            const routerPath = state.redirect === '/404' || state.redirect === '/401' ? '/' : state.redirect
            // 在 authentication 为 all的情况下,要考虑到不同的用户是会有不用的权限页面展示的,那么如果历史记录的是A用户的专属页面,而我这个时候登录B用户
            // 所以这里要做一些处理,有两种方案
            // 一: 如果为 all的情况下,直接跳转到index页面
            // 二: 记录每个页面的权限,如果当前登录的用户权限不满足要跳转的目标页面,那么再跳转到index页面

            // 这里用第一种方案
            // router.push(store.getters['setting/authentication'] === 'all' ? '/index' : routerPath)

            // 或者也可以这样用,当目标路由不存在会报错,报错了再跳到index页面
            router.push(routerPath).catch((e) => { router.push('/index') })

            state.loading = false
          })
        }
      })
    }

    return {
      ...toRefs(state),
      validateForm,
      handleLogin,
      t
    }
  }
}
</script>

<style lang="scss" scoped>
.login-ruleForm {
  margin-top: 1rem;
  :deep(.el-input__prefix) {
    top: 2px;
    padding: 0 4px;
  }
  .login-methods {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .login-btn {
    width: 100%;
    background-color: #409eff !important;
  }
  .login-check {
    display: flex;
    align-content: center;
    justify-content: space-between;
  }
}
</style>
