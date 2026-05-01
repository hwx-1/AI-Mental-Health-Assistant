<template>
    <div class="frontend-layout">
        <div class="navbar-container">
            <div class="brand-section">
                <el-image style="width: 50px; height: 50px" :src="iconUrl" alt="品牌logo" class="brand-logo" />
                <h1 class="brand-name">心理健康AI助手</h1>
            </div>
            <div class="nav-section">
                <router-link to="/" class="nav-link">首页</router-link>
                <router-link to="/consultation" class="nav-link" v-if="isLoggedIn">AI咨询</router-link>
                <router-link to="/emotion-diary" class="nav-link" v-if="isLoggedIn">情绪日记</router-link>
                <router-link to="/frontendKnowledge" class="nav-link" >知识库</router-link>
                
                <el-button class="logout-btn" v-if="isLoggedIn" @click="handleLogout">退出登录</el-button>
                <template v-else>
                    <router-link to="/auth/login" class="nav-link">登录</router-link>
                    <router-link to="/auth/registor" class="nav-link">
                        <el-button type="primary">注册</el-button>
                    </router-link>
                </template>
            </div>
        </div>
        <div class="main-container">
            <router-view></router-view>
        </div>
        <div class="footer-container">
            <div class="footer-bottom">© 2026 心理健康AI助手 版权所有</div>
        </div>
    </div>
</template>

<script setup>
// 【核心修复】：必须引入 onMounted，引入 useRouter 处理跳转
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// 这里的路径请根据你 assets 文件夹的真实名称确认是 image 还是 images
const iconUrl = new URL('@/assets/images/机器人.png', import.meta.url).href

const isLoggedIn = ref(false)
const router = useRouter()

onMounted(() => {
    isLoggedIn.value = localStorage.getItem('token') !== null
})

// 【核心修复】：退出登录函数
const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    isLoggedIn.value = false
    router.push('/auth/login')
}
</script>

<style lang="scss">
.frontend-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #fff;

    .navbar-container {
        max-width: 1200px;
        width: 100%;
        margin: 0 auto;
        padding: 10px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .brand-section {
            display: flex;
            align-items: center;
            .brand-name {
                margin-left: 10px;
                font-size: 24px;
                font-weight: 600;
                color: #333;
            }
        }

        .nav-section {
            display: flex;
            align-items: center;
            gap: 20px;
            .nav-link {
                color: #4b5563;
                font-size: 16px;
                font-weight: 500;
                text-decoration: none;
                &:hover { color: #4A90E2; }
            }
        }
    }

    .main-container {
        flex: 1;
        max-width: 1200px;
        width: 100%;
        margin: 0 auto;
        padding: 20px;
    }

    .footer-container {
        background: #1f2937;
        color: white;
        padding: 20px 0;
        text-align: center;
    }
}
</style>