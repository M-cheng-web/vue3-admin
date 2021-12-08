<template>
  <div id="tabs-bar-container" class="tabs-bar-container" :class="{ horizontal: mode === 'horizontal' }">

    <!-- 左侧的tab组 -->
    <el-tabs
      v-model="tabActive"
      type="card"
      class="tabs-content"
      @tab-click="handleTabClick"
      @tab-remove="handleTabRemove"
    >
      <el-tab-pane v-for="item in visitedRouteList" :key="item.path" :name="item.path" :closable="!(item.meta && item.meta.affix)">
        <template #label>
          <div class="item">
            <component class="menu-icon" v-if="item.meta.icon" theme="outline" strokeWidth="3" :is="item.meta.icon" />
            <span>{{ item.meta.title }}</span>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>

    <!-- 右侧的修改控件 -->
    <el-popover placement="bottom" width="auto" trigger="hover" @show="handleShow" @hide="handleHide">
      <template #reference>
        <span class="more" :class="{ active: visible }" style="cursor: pointer">
          <all-application theme="filled" size="18" :strokeWidth="3" />
        </span>
      </template>
      <div class="command-item" v-for="(item, index) in commandList" :key="index" @click="handleCommand(item.command)">
        <component class="icon" theme="filled" size="14" :strokeWidth="3" :is="item.icon" />
        <span class="command-label">{{ item.text }}</span>
      </div>
    </el-popover>
  </div>
</template>

<script>
import { reactive, watch, toRefs, computed, nextTick } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

export default {
  name: 'TabBar',
  setup () {
    const store = useStore()
    const router = useRouter()
    const { t } = useI18n()

    const visitedRouteList = computed(() => store.getters['tabsBar/visitedRoutes']) // 打开过的路由
    const routes = computed(() => store.getters['routes/routes']) // 全部路由信息
    const mode = computed(() => store.getters['setting/mode']) // 当前布局模式

    const state = reactive({
      affixtabs: [], // 需要固定的tab
      tabActive: '', // 当前选中的tab标签
      visible: false, // 右侧控件的是否选中
      commandList: [ // 右侧控件选中弹出的选项
        {
          command: 'refreshRoute',
          text: t('tagsView.refresh'),
          icon: 'refresh'
        },
        {
          command: 'closeOtherstabs',
          text: t('tagsView.closeOthers'),
          icon: 'close'
        },
        {
          command: 'closeLefttabs',
          text: t('tagsView.closeLeft'),
          icon: 'to-left'
        },
        {
          command: 'closeRighttabs',
          text: t('tagsView.closeRight'),
          icon: 'to-right'
        },
        {
          command: 'closeAlltabs',
          text: t('tagsView.closeAll'),
          icon: 'minus'
        }
      ]
    })

    /**
     * 过滤出需要固定的tab(固定的意思是不能删除)
     */
    const filterAffixtabs = (routes) => {
      let tabs = []
      routes.forEach((route) => {
        if (route.meta && route.meta.affix) {
          tabs.push({
            fullPath: route.path,
            path: route.path,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const temptabs = filterAffixtabs(route.children, route.path)
          if (temptabs.length >= 1) {
            tabs = [...tabs, ...temptabs]
          }
        }
      })
      return tabs
    }
    /**
     * 初始化tab
     */
    const inittabs = () => {
      const affixtabs = (state.affixtabs = filterAffixtabs(routes.value))
      affixtabs.forEach(tag => {
        if (tag.name) {
          store.dispatch('tabsBar/addVisitedRoute', tag)
        }
      })
    }
    /**
     * 添加tab
     */
    const addtabs = (currentRoute) => {
      if (currentRoute.name) {
        store.dispatch('tabsBar/addVisitedRoute', currentRoute)
      }
    }
    watch(
      () => router.currentRoute.value,
      (currentRoute) => {
        if (currentRoute.path === '/login') {
          return
        }
        inittabs()
        addtabs(currentRoute)
        state.tabActive = visitedRouteList.value.find(item => currentRoute.path === item.path).path || ''
      },
      { immediate: true }
    )

    // ------------------ 右侧的修改tab控件事件 ------------------
    /**
     * tab移除事件
     */
    const handleTabRemove = async (tabActive) => {
      const view = visitedRouteList.value.find((item) => tabActive === item.path)
      const { visitedRoutes } = await store.dispatch('tabsBar/delRoute', view)
      if (view && view.path === router.currentRoute.value.path) {
        router.push(visitedRoutes.slice(-1)[0] || '/') // 跳转到最后一个tag
      }
    }
    /**
     * 点击tab事件
     */
    const handleTabClick = (tab) => {
      const route = visitedRouteList.value[tab.index]
      if (router.currentRoute.value.path !== route.path) {
        router.push({
          path: route.path,
          query: route.query,
          fullPath: route.fullPath
        })
      }
    }
    /**
     * 重新加载tab
     */
    const refreshRoute = async () => {
      store.dispatch('setting/setRouterView', false)
      nextTick(() => {
        store.dispatch('setting/setRouterView', true)
      })
    }
    /**
     * 关闭其他tab
     */
    const closeOtherstabs = async () => {
      const view = await toThisTag()
      await store.dispatch('tabsBar/delOthersRoutes', view)
    }
    /**
     * 关闭左侧tab
     */
    const closeLefttabs = async () => {
      const view = await toThisTag()
      await store.dispatch('tabsBar/delLeftRoutes', view)
    }
    /**
     * 关闭右侧tab
     */
    const closeRighttabs = async () => {
      const view = await toThisTag()
      await store.dispatch('tabsBar/delRightRoutes', view)
    }
    /**
     * 关闭所有tab
     */
    const closeAlltabs = async () => {
      const view = await toThisTag()
      const { visitedRoutes } = await store.dispatch('tabsBar/delAllRoutes')
      if (state.affixtabs.some((tag) => tag.path === view.path)) {
        return
      }
      router.push(visitedRoutes.slice(-1)[0] || '/') // 跳转到最后一个tag
    }
    /**
     * 获取当前路由代表的tab栏信息
     */
    const toThisTag = async () => {
      const { fullPath, path } = router.currentRoute.value
      const view = visitedRouteList.value.find((item) => item.path === fullPath)
      if (path !== view.path) router.push(view)
      return view
    }
    /**
     * 右侧操控菜单点击事件
     */
    const handleCommand = (command) => {
      switch (command) {
        case 'refreshRoute':
          refreshRoute()
          break
        case 'closeOtherstabs':
          closeOtherstabs()
          break
        case 'closeLefttabs':
          closeLefttabs()
          break
        case 'closeRighttabs':
          closeRighttabs()
          break
        case 'closeAlltabs':
          closeAlltabs()
          break
        default:
          return '错误的事件类型'
      }
    }
    /**
     * 右侧操控菜单显示
     */
    const handleShow = () => {
      state.visible = true
    }
    /**
     * 右侧操控菜单隐藏
     */
    const handleHide = () => {
      state.visible = false
    }

    return {
      ...toRefs(state),
      visitedRouteList,
      routes,
      mode,
      refreshRoute,
      closeAlltabs,
      closeRighttabs,
      closeLefttabs,
      closeOtherstabs,
      handleTabClick,
      handleTabRemove,
      handleCommand,
      handleShow,
      handleHide
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs-bar-container {
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  height: $base-tabs-bar-height;
  padding-right: $base-padding;
  padding-left: $base-padding;
  user-select: none;
  background: $base-color-white;
  border-top: 1px solid #f6f6f6;
  &.horizontal {
    padding: 0 40px;
  }
  :deep(.fold-unfold) {
    margin-right: $base-padding;
  }
  :deep(.el-tabs__item) {
    display: inline-flex;
    align-items: center;
  }
  .item {
    display: inline-flex;
    align-items: center;
    .menu-icon {
      display: flex;
      padding-right: $base-margin-5;
    }
  }

  .tabs-content {
    width: calc(100% - 90px);
    height: $base-tag-item-height;
    :deep(.el-tabs__nav-next, .el-tabs__nav-prev) {
      height: $base-tag-item-height;
      line-height: $base-tag-item-height;
    }
    :deep(.el-tabs__header) {
      border-bottom: 0;
      .el-tabs__nav {
        border: 0;
        .el-tabs__item {
          box-sizing: border-box;
          height: $base-tag-item-height;
          margin-right: $base-margin-5;
          line-height: $base-tag-item-height;
          border: none;
          border-radius: $base-border-radius;
          transition: padding 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
          &.is-active {
            color: $base-color-primary;
            background: $base-color-primary-light9;
            border: none;
            border-bottom: 2px solid;
          }
          &:hover {
            color: $base-color-primary;
            background: $base-color-primary-light9;
            border: none;
            border-bottom: 2px solid;
          }
        }
      }
    }
  }
}
.command-item {
  display: flex;
  align-content: center;
  align-items: center;
  padding: 5px 10px;
  cursor: pointer;
  .command-label {
    padding-left: 5px;
  }
  &:hover {
    color: $base-color-primary;
    background-color: $base-color-primary-light9;
  }
  .icon {
    display: flex;
  }
}
.more {
  display: flex;
  align-content: center;
  align-items: center;
  color: $base-font-color;
  cursor: pointer;
  transition: all 0.5s;
  &.active {
    color: $base-color-primary !important;
    transform: rotate(180deg);
  }
}
</style>
