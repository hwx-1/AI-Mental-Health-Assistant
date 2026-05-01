import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useAdminStore = defineStore('admin', () => {
    const isCollapser = ref(false)

    const toggleCollapse = () => {
        isCollapser.value = !isCollapser.value
    }

    return {
        isCollapser,
        toggleCollapse
    }
})