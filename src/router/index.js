import { createRouter, createWebHistory } from 'vue-router'
import BackendLayout from '@/components/BackendLayout.vue'
import AuthLayout from '@/components/AuthLayout.vue'
import FrontendLayout from '@/components/FrontendLayout.vue' // 注意大小写匹配

// 后台路由
const backendRoutes = [
    {
        path: '/back',
        redirect: '/back/dashboard',
        component: BackendLayout,
        children: [
            { path: 'dashboard', component: () => import('@/views/dashboard.vue'), meta: { title: '数据概览', icon: 'Search' } },
            { path: 'knowledge', component: () => import('@/views/knowledge.vue'), meta: { title: '知识文章', icon: 'Edit' } },
            { path: 'consultations', component: () => import('@/views/consultations.vue'), meta: { title: '咨询记录', icon: 'Message' } },
            { path: 'emotional', component: () => import('@/views/emotional.vue'), meta: { title: '情绪日志', icon: 'Star' } }
        ]
    }
]

// 前台路由
const frontendLayout = [
    {
        path: '/',
        component: FrontendLayout,
        children: [
            { 
                path: '',
                component: () => import('@/views/home.vue') 
            },
            { 
                path: 'consultation',
                component: () => import('@/views/consultation.vue') 
            },
            // 【修复】：删除了重复的 emotion-diary 配置
            { 
                path: 'emotion-diary',
                component: () => import('@/views/emotionDiary.vue') 
            },
            { 
                path: 'frontendKnowledge',
                component: () => import('@/views/frontendKnowledge.vue') 
            },
            {
                path: 'knowledge/article/:id',
                component: () => import('@/views/articleDetail.vue'),
                props: true
            }
        ]
    },
    {
        path: '/auth',
        component: AuthLayout,
        children: [
            { path: 'login', component: () => import('@/views/login.vue') },
            { path: 'registor', component: () => import('@/views/registor.vue') }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: [...backendRoutes, ...frontendLayout]
})

// 路由守卫保持之前修正过的版本即可（处理 token 和 userType 逻辑）
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    if (token) {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
            if (to.path.startsWith('/auth')) {
                next(userInfo.userType == 2 ? '/back/dashboard' : '/')
                return
            }
            if (userInfo.userType == 2) {
                next()
            } else {
                to.path.startsWith('/back') ? next('/') : next()
            }
        } catch (e) {
            localStorage.clear()
            next('/auth/login')
        }
    } else {
        to.path.startsWith('/back') ? next('/auth/login') : next()
    }
})

export default router