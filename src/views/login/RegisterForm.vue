<template>
  <el-form :model="regForm" ref="form" class="login-ruleForm">

    <!-- 手机号 -->
    <el-form-item prop="name">
      <el-input :placeholder="t('register.username')" v-model="regForm.name">
        <template #prefix>
          <user theme="outline" size="16" fill="#999" />
        </template>
      </el-input>
    </el-form-item>

    <!-- 短信验证码 -->
    <el-form-item>
      <div class="form-code">
        <el-input :placeholder="t('register.smsCode')" v-model="regForm.code">
          <template #prefix>
            <user theme="outline" size="16" fill="#999" />
          </template>
        </el-input>
        <el-button class="code-btn">{{ t("register.smsbtn") }}</el-button>
      </div>
    </el-form-item>

    <!-- 输入密码 -->
    <el-form-item prop="password">
      <el-input :placeholder="t('register.password')" type="password" v-model="regForm.password">
        <template #prefix>
          <lock theme="outline" size="16" fill="#999" />
        </template>
      </el-input>
    </el-form-item>

    <!-- 确定密码 -->
    <el-form-item prop="password">
      <el-input :placeholder="t('register.confirmPwd')" type="password" v-model="regForm.rePassword">
        <template #prefix>
          <lock theme="outline" size="16" fill="#999" />
        </template>
      </el-input>
    </el-form-item>

    <!-- 注册按钮 -->
    <el-form-item>
      <el-button type="primary" size="medium" class="login-btn" round>{{ t("register.registerBtn") }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
export default {
  name: 'RegisterForm',
  setup () {
    const { t } = useI18n()
    const state = reactive({
      regForm: {
        name: '',
        code: '',
        password: '',
        rePassword: ''
      }
    })
    return {
      ...toRefs(state),
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
    margin-bottom: 1rem;
  }
  .login-check {
    display: flex;
    align-content: center;
    justify-content: space-between;
  }
  .form-code {
    display: flex;
    align-content: center;
    justify-content: space-between;
    .code-btn {
      margin-left: 1rem;
    }
  }
}
</style>
