import service from '@/utils/request'

export function Login(data) {
    return service.post('/user/login', data)
}

export function categoryTree() {
    return service.get('/knowledge/category/tree')
}

export function articlePage(params) {
    return service.get('/knowledge/article/page', { params })
}

export function uploadFile(file, businessInfo) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('businessType', 'ARTICLE') // 修复字段名
    formData.append('businessId', businessInfo.businessId)
    formData.append('businessField', 'cover')
    
    // 不要手动设置 headers，让浏览器自动生成 boundary
    return service.post('/file/upload', formData)
}

export function createArticle(data) {
    return service.post('/knowledge/article', data)
}

export function getArticleDetail(id) {
    return service.get(`/knowledge/article/${id}`)
}

// 新增更新接口，路径包含 ID
export function updateArticle(data) {
    return service.put(`/knowledge/article/${data.id}`, data)
}

export function changeArticleStatus(id, data) {
    return service.put(`/knowledge/article/${id}/status`, data)
}

//删除接口
export function deleteArticle(id) {
    return service.delete(`/knowledge/article/${id}`)
}

//分页查询咨询会话接口
export function getConsultationPage(params) {
    return service.get('/psychological-chat/sessions', { params })
}

//获取会话消息列表接口
export function getSessionDetail(sessionId) {
    return service.get(`psychological-chat/sessions/${sessionId}/messages`)
}

//分页查询情绪列表接口
export function getEmotionalPage(params) {
    return service.get('/emotion-diary/admin/page', { params })
}

// 【修复核心】：加上了 $ 符号，正确拼接 ID
export function deleteEmotional(id) {
    return service.delete(`/emotion-diary/admin/${id}`)
}

//获取综合数据分析接口
export function getAnalyticsOverview() {
    return service.get('/data-analytics/overview')
}

//用户退出登录接口
export function logout() {
    return service.post('/user/logout')
}

