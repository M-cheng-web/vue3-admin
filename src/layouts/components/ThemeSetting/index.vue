<template>
  <el-drawer
    :title="t('settings.title')"
    v-model="settings.isDrawerSetting"
    direction="rtl"
    :before-close="handleClose"
    destroy-on-close
    :size="320"
  >
    <div class="theme-wrapper">
      <el-scrollbar height="85vh">
        <div class="form">
          <el-form label-width="100px" label-position="left">
            <!-- element-plus 的菜单组件布局有问题,会卡死,暂时不知道什么原因 -->
            <!-- <el-form-item :label="t('settings.layout')">
              <el-select
                class="theme-select-width"
                v-model="settings.mode"
                size="small"
                placeholder="请选择"
                @change="handleChangeMode"
              >
                <el-option v-for="item in setting.modeOption" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item> -->
            <el-form-item :label="t('settings.theme')">
              <el-select
                class="theme-select-width"
                v-model="settings.theme"
                size="small"
                placeholder="请选择"
                @change="handleChangeTheme"
              >
                <el-option v-for="item in setting.colorOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="Logo">
              <el-switch v-model="settings.isLogo" />
            </el-form-item>
            <el-form-item :label="t('settings.tag')">
              <el-switch @change="changeSetting('changeTag', $event)" v-model="setting.tag" />
            </el-form-item>
            <el-form-item :label="t('settings.breadcurmb')">
              <el-switch :disabled="settings.mode === 'horizontal'" @change="changeSetting('changeBreadcrumb', $event)" v-model="setting.isBreadcrumb" />
            </el-form-item>
            <el-form-item :label="t('settings.fixed')">
              <el-switch :disabled="isMobile" @change="changeSetting('changeFixHead', $event)" v-model="settings.fixedHead" />
            </el-form-item>
            <el-form-item :label="t('settings.fullscreen')">
              <el-switch @change="changeSetting('changeFullScreen', $event)" v-model="settings.fullScreen" />
            </el-form-item>
            <el-form-item :label="t('settings.refresh')">
              <el-switch @change="changeSetting('changeRefresh', $event)" v-model="settings.refresh" />
            </el-form-item>
            <el-form-item :label="t('settings.notice')">
              <el-switch @change="changeSetting('changeNotic', $event)" v-model="settings.notice" />
            </el-form-item>
          </el-form>
        </div>
      </el-scrollbar>
    </div>
  </el-drawer>
</template>

<script setup>
import { reactive, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { themeConfig } from '@/config/theme'

const store = useStore()
const { t } = useI18n()
const ORIGINAL_THEME = '#409EFF'
const { themeOptions } = themeConfig
const settings = computed(() => store.getters['setting/settings'])
const isMobile = computed(() => store.getters['setting/isMobile'])

const setting = reactive({
  tag: true,
  chalk: '',
  isLogo: true,
  mode: 'vertical',
  isBreadcrumb: true,
  fixedHead: true,
  fullscreen: true,
  refresh: true,
  notice: true,
  modeOption: [ // 布局
    {
      value: 'vertical',
      label: t('layout.vertical')
    },
    {
      value: 'horizontal',
      label: t('layout.horizontal')
    }
  ],
  colorOptions: [ // 主题
    {
      value: 'theme1',
      label: t('theme.options.theme1')
    },
    {
      value: 'theme2',
      label: t('theme.options.theme2')
    },
    {
      value: 'theme3',
      label: t('theme.options.theme3')
    },
    {
      value: 'theme4',
      label: t('theme.options.theme4')
    },
    {
      value: 'theme5',
      label: t('theme.options.theme5')
    },
    {
      value: 'theme6',
      label: t('theme.options.theme6')
    }
  ]
})

/**
 * 关闭主题设置弹框
 */
const handleClose = () => {
  store.dispatch('setting/setSettingDrawer', false)
}

/**
 * 布局设置
 */
// const handleChangeMode = (val) => {
//   store.dispatch('setting/setSettingOptions', settings)
//   store.dispatch('setting/setMode', val)
// }

/**
 * 主题设置
 */
const handleChangeTheme = (val) => {
  store.dispatch('setting/setTheme', val)
}

/**
 * 更改设置
 * logo(changeLogo) / 标签(changeTag) / 面包导航(changeBreadcrumb)
 * / 固定头部(changeFixHead) / 全屏(changeFullScreen) / 刷新(changeRefresh) / 通知(changeNotic)
 */
const changeSetting = (type, val) => {
  store.dispatch(`setting/${type}`, val)
}

/**
 * 获取目标主题的配置
 */
const getThemeCluster = (theme) => {
  const tintColor = (color, tint) => {
    let red = parseInt(color.slice(0, 2), 16)
    let green = parseInt(color.slice(2, 4), 16)
    let blue = parseInt(color.slice(4, 6), 16)
    if (tint === 0) {
      return [red, green, blue].join(',')
    } else {
      red += Math.round(tint * (255 - red))
      green += Math.round(tint * (255 - green))
      blue += Math.round(tint * (255 - blue))
      red = red.toString(16)
      green = green.toString(16)
      blue = blue.toString(16)
      return `#${red}${green}${blue}`
    }
  }
  const shadeColor = (color, shade) => {
    let red = parseInt(color.slice(0, 2), 16)
    let green = parseInt(color.slice(2, 4), 16)
    let blue = parseInt(color.slice(4, 6), 16)
    red = Math.round((1 - shade) * red)
    green = Math.round((1 - shade) * green)
    blue = Math.round((1 - shade) * blue)
    red = red.toString(16)
    green = green.toString(16)
    blue = blue.toString(16)
    return `#${red}${green}${blue}`
  }
  const clusters = [theme]
  for (let i = 0; i <= 9; i++) {
    clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
  }
  clusters.push(shadeColor(theme, 0.1))
  return clusters
}

const updateStyle = (style, oldCluster, newCluster) => {
  let newStyle = style
  oldCluster.forEach((color, index) => {
    newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
  })
  return newStyle
}

const getCSSString = (url, variable) => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        setting[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
        resolve()
      }
    }
    xhr.open('GET', url)
    xhr.send()
  })
}

/**
 * 监听主题变化
 */
watch(
  () => settings.value.theme,
  async (theme) => {
    const val = themeOptions[theme].primary
    if (typeof val !== 'string') return

    const oldVal = setting.chalk ? settings.value.theme : ORIGINAL_THEME
    const themeCluster = getThemeCluster(val.replace('#', ''))
    const originalCluster = getThemeCluster(oldVal.replace('#', ''))

    const getHandler = (variable, id) => {
      return () => {
        const originalCluster = getThemeCluster(ORIGINAL_THEME.replace('#', ''))
        const newStyle = updateStyle(setting[variable], originalCluster, themeCluster)
        let styleTag = document.getElementById(id)
        if (!styleTag) {
          styleTag = document.createElement('style')
          styleTag.setAttribute('id', id)
          document.head.appendChild(styleTag)
        }
        styleTag.innerText = newStyle
      }
    }
    if (!setting.chalk) {
      const url = 'https://cdn.jsdelivr.net/npm/element-plus/dist/index.css'
      await getCSSString(url, 'chalk')
    }
    getHandler('chalk', 'chalk-style')()
    const styles = [].slice.call(document.querySelectorAll('style')).filter((style) => {
      const text = style.innerText
      return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
    })
    styles.forEach((style) => {
      const { innerText } = style
      if (typeof innerText !== 'string') return
      style.innerText = updateStyle(innerText, originalCluster, themeCluster)
    })
  },
  {
    immediate: true
  }
)
</script>

<script>
export default {
  name: 'ThemeSetting'
}
</script>

<style lang="scss" scoped>
.theme-wrapper {
  display: flex;
  flex-direction: column;
  height: $base-height;
  .form {
    flex: 1;
    padding: 0 20px;
  }
  :deep(.el-form-item__content) {
    text-align: right;
  }
  .theme-select-width {
    width: $base-select-width-small;
  }
  .drawer-footer {
    position: fixed;
    bottom: 0;
    box-sizing: border-box;
    align-content: center;
    justify-content: space-between;
    width: $base-drawer-width;
    height: $base-drawer-footer-height;
    padding: $base-padding-10-20;
    background-color: $base-color-white;
    border-top: 1px solid $base-border-color;
  }
}
</style>
