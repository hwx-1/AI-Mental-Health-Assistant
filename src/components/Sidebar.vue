<template>
    <el-aside :width="isCollapser ? '64px' : '264px'">
      <el-menu
        :collapse="isCollapser"
        :collapse-transition="false"
        :default-active="route.path" 
        class="menu-style"
      >
        <div class="brand">
            <el-image style="width:50px; height:50px; margin-right:10px;" :src="iconUrl" alt="logo" />
            <div v-show="!isCollapser" class="info-card">
              <h1 class="brand-title">心理健康AI助手</h1>
              <p class="brand-subtitle">管理后台</p>
            </div>
        </div>

        <!-- 循环渲染菜单项 -->
        <el-menu-item 
            @click="selectMenu(item.path)" 
            v-for="item in menuRoutes" 
            :key="item.path" 
            :index="`/back/${item.path}`"
        >
          <!-- 加上容错机制，防止图标组件未加载导致整个菜单白屏 -->
          <el-icon v-if="item.meta && item.meta.icon && getIconComponent(item.meta.icon)">
              <component :is="getIconComponent(item.meta.icon)" />
          </el-icon>
          <span>{{ item.meta ? item.meta.title : '未命名' }}</span>
        </el-menu-item>
        
      </el-menu>
    </el-aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAdminStore } from '@/stores/admin'
import { Search, Edit, Message, Star } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute() 

const iconUrl = new URL('@/assets/images/机器人.png', import.meta.url).href
const isCollapser = computed(() => useAdminStore().isCollapser)

// 图标映射对象
const iconMap = {
    Search,
    Edit,
    Message,
    Star
}

// 获取图标组件
const getIconComponent = (iconName) => {
    return iconMap[iconName] || null
}

// ✅ 核心修复 1：最安全地提取后台路由配置
const menuRoutes = computed(() => {
    // 精准定位到 path 为 '/back' 的那个路由块
    const backRoute = router.options.routes.find(r => r.path === '/back')
    
    // 如果找到了，并且它有 children 子页面，就把有 title 的筛选出来
    if (backRoute && backRoute.children) {
        return backRoute.children.filter(child => child.meta && child.meta.title)
    }
    return []
})

// ✅ 核心修复 2：子路由 path 通常是 'dashboard'（没有前面的 /back/），需要手动拼接
const selectMenu = (childPath) => {
    router.push(`/back/${childPath}`)
}
</script>

<style lang="scss" scoped>
.menu-style {
  height: 100%;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background-color: #fff;
    border-bottom: 1px solid #e5e7eb;
    .info-card {
      .brand-title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 5px;
        color: #1f2937;
      }
      .brand-subtitle {
        font-size: 14px;
        color: #6b7280;
      }
    }
  }
}
</style>