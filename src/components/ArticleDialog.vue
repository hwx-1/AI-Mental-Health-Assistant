<template>
  <el-dialog
    :title="isEdit ? '编辑文章' : '新增文章'"
    v-model="dialogVisible"
    @close="handleClose"
    width="50%"
  >
    <el-form :model="formData" :rules="rules" ref="formRef" label-width="120px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入文章标题" maxlength="200" show-word-limit clearable />
      </el-form-item>
      <el-form-item label="所属分类" prop="categoryId">
        <el-select v-model="formData.categoryId" placeholder="请选择分类">
          <el-option v-for="item in props.categories" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="文章摘要" prop="summary">
        <el-input type="textarea" v-model="formData.summary" placeholder="请输入文章摘要（可选）" maxlength="1000" show-word-limit :rows="4" />
      </el-form-item>

      <el-form-item label="标签" prop="tags">
        <el-select v-model="formData.tagArray" placeholder="请输入文章标签" multiple filterable allow-create style="width: 100%">
          <el-option v-for="tag in commonTags" :key="tag" :label="tag" :value="tag" />
        </el-select>
      </el-form-item>

      <el-form-item label="封面图片">
        <div class="cover-upload">
          <el-upload
            class="avator-upload"
            action="#"
            :before-upload="beforeUpload"
            :http-request="handleUploadRequest"
            :show-file-list="false"
            accept="image/*"
          >
            <div v-if="!imgUrl" class="cover-placeholder">
              <p>点击上传封面</p>
            </div>
            <img v-else :src="imgUrl" class="cover-image" alt="封面图片" />
          </el-upload>
          <div v-if="imgUrl" style="margin-top: 10px;">
            <el-button type="danger" size="small" @click="handleRemove">移除封面</el-button>
          </div>
        </div>
      </el-form-item>

      <el-form-item label="文章内容" prop="content">
        <RichTextEditor
          v-model="formData.content"
          placeholder="请输入文章内容..."
          :maxCharCount="5000"
          @change="handleContentChange"
          @created="handleEditorCreated"
          min-height="400px"
        />
      </el-form-item>
    </el-form>

    <div v-if="btnPreview">
      <h3>内容预览</h3>
      <div v-html="formData.content" style="border: 1px solid #eee; padding: 10px;"></div>
    </div>

    <template #footer>
      <el-button @click="btnPreview = !btnPreview">{{ btnPreview ? '隐藏预览' : '预览效果'}}</el-button>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="loading">{{ isEdit ? '更新文章' : '创建文章' }}</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, computed, nextTick, watch } from 'vue'
import { ElMessage } from 'element-plus'
// 【修复】：引入了 updateArticle 接口
import { uploadFile, createArticle, updateArticle } from '@/api/admin'
import { fileBaseUrl } from '@/config/index.js'
import RichTextEditor from '@/components/RichTextEditor.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  categories: {
    type: Array,
    default: () => []
  },
  article: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'success'])

const dialogVisible = computed({
  get() { return props.modelValue },
  set(val) { emit('update:modelValue', val) }
})

const isEdit = computed(() => !!props.article?.id )

// 表单数据
const formData = reactive({
  title: "",
  content: "",
  coverImage: "",
  categoryId: "",
  summary: "",
  tagArray: [], // 使用数组处理多选
  id: ""
})

// 【核心修复】：监听弹窗打开，处理数据回显和表单重置
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    if (isEdit.value && props.article) {
      // 1. 编辑模式：回显数据
      Object.assign(formData, props.article)
      // 处理标签：字符串转数组
      formData.tagArray = props.article.tags ? props.article.tags.split(',') : []
      // 处理封面回显
      imgUrl.value = formData.coverImage ? 
        (formData.coverImage.startsWith('http') ? formData.coverImage : `${fileBaseUrl}${formData.coverImage}`) : ""
    } else {
      // 2. 新增模式：清空上一次的残留数据
      Object.assign(formData, {
        title: "", content: "", coverImage: "", categoryId: "", summary: "", tagArray: [], id: ""
      })
      imgUrl.value = ""
      // 清除校验红字提示
      nextTick(() => {
        formRef.value?.clearValidate()
      })
    }
  }
})


// 校验规则
const rules = reactive({
  title: [
    { required: true, message: '请输入文章标题', trigger: 'blur' },
    { max: 200, message: '文章标题最多200个字', trigger: 'blur' }
  ],
  categoryId: [
    { required: true, message: '请选择分类', trigger: 'change' }
  ],
  content: [
    { required: true, message: '请输入文章内容', trigger: 'blur' }
  ]
})

const commonTags = ['情绪管理', '焦虑', '抑郁', '压力', '睡眠', '冥想', '心理健康', '自我成长']

// 上传预览地址
const imgUrl = ref("")

const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  const isLt5M = file.size / 1024 / 1024 < 5
  if (!isImage) {
    ElMessage.error('请选择图片文件')
    return false
  }
  if (!isLt5M) {
    ElMessage.error('图片大小不能超过5MB')
    return false
  }
  // 本地预览
  imgUrl.value = URL.createObjectURL(file)
  return true
}

// 【修复】：精简了上传结果的处理，适配全新的拦截器返回格式
const handleUploadRequest = async (options) => {
  const { file, onSuccess, onError } = options
  const businessId = crypto.randomUUID()

  try {
    const fileRes = await uploadFile(file, { businessId })
    // 因为 request.js 拦截器已经脱壳直接返回 data，所以 fileRes 就是真正的地址或对象
    const uploadedPath = typeof fileRes === 'string' ? fileRes : (fileRes?.filePath || fileRes?.url || fileRes?.coverImage || '')
    
    if (!uploadedPath) {
      throw new Error('上传成功但未返回文件地址')
    }

    formData.coverImage = uploadedPath
    imgUrl.value = uploadedPath.startsWith('http') ? uploadedPath : `${fileBaseUrl}${uploadedPath}`
    onSuccess?.(fileRes)
  } catch (error) {
    // 错误已经在 request.js 弹出了，这里保险起见再接一下
    onError?.(error)
  }
}
  
const handleRemove = () => {
  imgUrl.value = ''
  formData.coverImage = ''
}

// 富文本
const handleContentChange = (data) => {
  formData.content = data.html
}

const editorInstance = ref(null)
const handleEditorCreated = (editor) => {
  editorInstance.value = editor
}

// 提交
const formRef = ref()
const loading = ref(false)
const btnPreview = ref(false)

// 【核心修复】：根据是不是编辑模式，分别调用新增和更新接口
const handleSubmit = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      // 提交前，把数组格式的标签转回字符串给后端
      const submitData = {
        ...formData,
        tags: formData.tagArray.join(','),
      }
      delete submitData.tagArray

      try {
        if (isEdit.value) {
          await updateArticle(submitData)
          ElMessage.success('更新文章成功')
        } else {
          await createArticle(submitData)
          ElMessage.success('创建文章成功')
        }
        
        loading.value = false
        emit('success') // 告诉父组件刷新列表
        dialogVisible.value = false // 关闭弹窗
      } catch (error) {
        // 请求报错时的处理
        loading.value = false
      }
    }
  })
}

const handleClose = () => {
  dialogVisible.value = false
}
</script>

<style lang="scss" scoped>
.cover-placeholder {
  width: 200px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #8b949e;
  background: #f6f8fa;
  border: 1px dashed #d9d9d9;
}

.cover-image {
  width: 200px;
  height: 120px;
  display: block;
  object-fit: cover;
}
</style>