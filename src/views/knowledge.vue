<template>
    <div>
        <PageHead title="知识文章">
            <template #buttons>
                <el-button @click="handleAdd" type="primary">新增</el-button>
            </template>
        </PageHead>
        <TableSearch :formItem="formItem" @search="handleSearch" />
        
        <el-table :data="tableData" style="width: 100%; margin-top: 25px">
            <el-table-column prop="title" label="文章标题" width="200" fixed="left">
                <template #default="scope">
                    <div style="display: flex; align-items: center;">
                        <el-icon><timer /></el-icon>
                        <span>{{ scope.row.title }}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="分类" width="200">
                <template #default="scope">
                    <span>{{ categoryMap[scope.row.categoryId] || '未分类' }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="authorName" label="作者" width="150"/>
            <el-table-column prop="readCount" label="阅读量" width="150"/>
            <el-table-column prop="updatedAt" label="发布时间" width="150"/>
            
            <el-table-column label="操作" width="240" fixed="right">
                <template #default="scope">
                    <el-button @click="handleEdit(scope.row)" text type="primary">编辑</el-button>
                    <el-button @click="handlePublish(scope.row)" v-if="scope.row.status === 0 || scope.row.status === 2" text type="success">发布</el-button>
                    <el-button @click="handleUnpublish(scope.row)" v-if="scope.row.status === 1" text type="warning">下线</el-button>
                    
                    <el-button @click="handleDelete(scope.row)" text type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            style="margin-top: 25px;"
            :current-page="pagination.currentPage"
            :page-size="pagination.size"
            layout="prev, pager, next"
            :total="pagination.total"
            @current-change="handleChange" 
        />

        <ArticleDialog 
            v-model:modelValue="dialogVisible" 
            :categories="categories" 
            :article="currentArticle" 
            @success="handleSuccess"
        />
    </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import PageHead from '@/components/PageHead.vue'
import TableSearch from '@/components/TableSearch.vue'
import { categoryTree, articlePage, getArticleDetail, changeArticleStatus, deleteArticle } from '@/api/admin'
import ArticleDialog from '@/components/ArticleDialog.vue'
import { ElMessageBox, ElMessage } from 'element-plus'

// 恢复搜索表单项配置
const formItem = reactive([
    { comp: 'input', prop: 'title', label: '文章标题', placeholder: '请输入文章标题' },
    { comp: 'select', prop: 'category', label: '文章分类', placeholder: '请选择文章分类', options: [] },
    {
        comp: 'select', prop: 'status', label: '状态', placeholder: '请选择文章状态', options: [
            { label: '草稿', value: '0' },
            { label: '已发布', value: '1' },
            { label: '已下线', value: '2' }
        ]
    }
])

const pagination = reactive({ currentPage: 1, size: 10, total: 0 })
const dialogVisible = ref(false)
const currentArticle = ref(null)
const tableData = ref([])
const categories = ref([])
const categoryMap = reactive({})

const handleAdd = () => {
    currentArticle.value = null
    dialogVisible.value = true
}

const handleEdit = (row) => {
    if (!row.id) return
    getArticleDetail(row.id).then(res => {
        // 适配拦截器直接返回的 data.data
        currentArticle.value = res
        dialogVisible.value = true
    })
}

const handleSearch = async (formData) => {
    const params = {
        page: pagination.currentPage,
        size: pagination.size,
        ...formData
    }
    try {
        const res = await articlePage(params)
        // 适配拦截器脱壳后的数据
        tableData.value = res.records || []
        pagination.total = res.total || 0
    } catch (error) {
        console.error('获取列表失败:', error)
    }
}

const handleChange = (page) => {
    pagination.currentPage = page
    handleSearch({})
}

const handleSuccess = () => {
    pagination.currentPage = 1
    handleSearch({})
}


//发布
const handlePublish = (row) => {
    ElMessageBox.confirm(
        `确定要发布该文章${row.title}吗？`,
        '提示', 
        {
            confirmButtonText: '确定发布',
            cancelButtonText: '取消',
            type: 'info',
        }
    ).then(() => {
        changeArticleStatus(row.id, { status: 1 }).then(res => {
            ElMessage.success('发布成功')
            handleSearch({})
        })
    })
}


const handleUnpublish = (row) => {
    ElMessageBox.confirm(
        `确认下线文章${row.title}吗？`,
        '提示', 
        {
            confirmButtonText: '确定下线',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        changeArticleStatus(row.id, { status: 2 }).then(res => {
            ElMessage.success('下线成功')
            handleSearch({})
        })
    })
}


const handleDelete = (row) => {
    ElMessageBox.confirm(
        `确认删除文章${row.title}吗？`,
        '提示', 
        {
            confirmButtonText: '确定删除',
            cancelButtonText: '取消',
            type: 'danger',
        }
    ).then(() => {
        deleteArticle(row.id).then(res => {
            ElMessage.success('删除成功')
            handleSearch({})
        })
    })
}
onMounted(async () => {
    try {
        const res = await categoryTree()
        // 适配拦截器直接返回的列表
        const list = res || []
        categories.value = list.map(item => {
            categoryMap[item.id] = item.categoryName
            return { label: item.categoryName, value: item.id }
        })
        formItem[1].options = categories.value
        handleSearch({})
    } catch (error) {
        console.error('获取分类失败:', error)
    }
})
</script>