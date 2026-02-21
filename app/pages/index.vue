<template>
  <div class="flex-1 flex items-center justify-center">
      <div class="container mx-auto px-4 max-w-4xl -mt-40">
        <div class="text-center mb-12">
          <h1 class="text-5xl font-bold mb-4">
            skills club
          </h1>
          <p class="text-xl text-muted-foreground mb-8">
            Collect the best practice skills from the community
          </p>
        </div>
       
        <!-- Search Box -->
        <form @submit.prevent="handleSearch" class="relative">
          <div class="relative">
            <CircuitBoard class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              v-model="searchQuery"
              type="text"
              placeholder="Search skills,authors,org..."
              class="h-14 pl-12 pr-4 text-lg"
              @keydown.enter="handleSearch"
            />
          </div>
        </form>
      </div>
  </div>
</template>

<script setup lang="ts">
import { CircuitBoard } from 'lucide-vue-next'

definePageMeta({
  layout: 'default',
})

const searchQuery = ref('')
const router = useRouter()

const popularTags = [
  'nuxt',
  'vue',
  'nitro',
  'react',
  'svelte',
  'vite',
  'next',
  'astro',
  'typescript',
  'angular',
  'analog',
  'solid',
]

function handleSearch() {
  if (searchQuery.value.trim()) {
    router.push(`/search?q=${encodeURIComponent(searchQuery.value.trim())}`)
  }
}
</script>
