<template>
    <div class="container">
        <div class="title">
            <div class="back-home">
                <el-icon><Back /></el-icon>
                <span>返回首页</span>  
            </div>
            <div class="title-text">
                <h2>登录您的账户</h2>
                <p>请输入您的登录信息</p>
            </div>
        </div>
        <div class="form-container">
            <el-form 
                ref="ruleFormRef"
                :model="formData"
                :rules="rules"
                label-position="top"
                >
                <el-form-item label="用户名或邮箱" prop="username">
                    <el-input v-model="formData.username" size="large" placeholder="请输入用户名或邮箱" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="formData.password" size="large" placeholder="请输入密码" type="password" show-password />
                </el-form-item>
                <el-button class="btn" size="large" type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
            </el-form>
            <div class="footer">
                <p>还没有账户？<router-link to="/auth/registor">去注册</router-link></p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Login } from '@/api/admin'
import { useRouter } from 'vue-router'
import { Back } from '@element-plus/icons-vue' // 【修复】：引入 Back 图标防止渲染白屏

const ruleFormRef = ref()
const formData = reactive({ username: '', password: '' })
const rules = reactive({
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

const router = useRouter()

const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            Login(formData).then(res => {
                
                const actualData = (res.data && res.data.data) || res.data || res;
                
                const token = actualData.token;
                const userInfo = actualData.userInfo;
                const roleType = actualData.roleType;

                if (!token) {
                    return console.error('登录失败', res)
                }

                localStorage.setItem('token', token)
                if (userInfo) {
                    // 【核心修复】：将 'user' 修改为 'userInfo'，确保和路由中读取的键名完全一致
                    localStorage.setItem('userInfo', JSON.stringify(userInfo))
                }
                
                if (roleType == 2) {
                    router.push('/back/dashboard')
                } else {
                    router.push('/')
                }
                
            }).catch(err => {
                console.error('接口异常', err)
            })
        }
    })
}
</script>

<style scoped lang="scss">
.container {
    width: 384px;
    .title {
        .back-home { margin-bottom: 60px; }
        .title-text {
            text-align: center;
            h2 { font-size: 36px; margin-bottom: 10px; }
            p { font-size: 18px; color: #6b7280; }
        }
    }
    .form-container {
        .btn { margin-top: 40px; width: 100%; }
        .footer { text-align: center; margin-top: 40px; }
    }
}
</style>