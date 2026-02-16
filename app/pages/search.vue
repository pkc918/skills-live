<template>
  <div class="container mx-auto px-4 py-8">
      <div v-if="pending" class="flex items-center justify-center py-20">
        <div class="text-muted-foreground">Loading...</div>
      </div>

      <div v-else-if="error" class="flex items-center justify-center py-20">
        <div class="text-destructive">Error: {{ error }}</div>
      </div>

      <div v-else-if="results && results.length > 0">
        <div class="mb-6">
          <p class="text-sm text-muted-foreground">
            Found {{ results.length }} results for "{{ query }}"
          </p>
        </div>

        <div class="space-y-4">
          <NuxtLink
            v-for="pkg in results"
            :key="pkg.name"
            :to="`/packages/${pkg.name}`"
            class="block p-6 rounded-lg border hover:bg-accent transition-colors"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <h3 class="text-xl font-semibold">{{ pkg.name }}</h3>
                  <span v-if="pkg.version" class="text-sm text-muted-foreground">
                    v{{ pkg.version }}
                  </span>
                </div>
                <p v-if="pkg.description" class="text-muted-foreground mb-3">
                  {{ pkg.description }}
                </p>
                <div class="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span v-if="pkg.downloads" class="flex items-center gap-1">
                    <DownloadIcon class="h-4 w-4" />
                    {{ formatDownloads(pkg.downloads) }}
                  </span>
                  <span v-if="pkg.updated" class="flex items-center gap-1">
                    <ClockIcon class="h-4 w-4" />
                    Updated {{ formatDate(pkg.updated) }}
                  </span>
                </div>
              </div>
              <ChevronRightIcon class="h-5 w-5 text-muted-foreground shrink-0 ml-4" />
            </div>
          </NuxtLink>
        </div>
      </div>

      <div v-else class="flex items-center justify-center py-20">
        <div class="text-center">
          <p class="text-muted-foreground mb-4">No results found</p>
          <NuxtLink to="/" class="text-primary hover:underline">
            Go back to homepage
          </NuxtLink>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { DownloadIcon, ClockIcon, ChevronRightIcon } from 'lucide-vue-next'

definePageMeta({
  layout: 'default',
  showSearch: true,
  sticky: true,
  searchPlaceholder: 'Search npm packages',
})

const route = useRoute()
const router = useRouter()

const query = computed(() => (route.query.q as string) || '')

// Mock data - in a real app, you would fetch from an API
const { data: results, pending, error } = useLazyAsyncData(
  `search-${query.value}`,
  async () => {
    if (!query.value) return []
    
    // Mock search results
    // In a real app, you would call an API like:
    // return await $fetch(`/api/search?q=${query.value}`)
    
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
    
    return [
      {
        name: query.value,
        version: '1.0.0',
        description: `A package related to ${query.value}`,
        downloads: Math.floor(Math.random() * 1000000),
        updated: new Date().toISOString(),
      },
      {
        name: `${query.value}-utils`,
        version: '2.3.1',
        description: `Utility functions for ${query.value}`,
        downloads: Math.floor(Math.random() * 500000),
        updated: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        name: `@types/${query.value}`,
        version: '1.2.0',
        description: `TypeScript definitions for ${query.value}`,
        downloads: Math.floor(Math.random() * 200000),
        updated: new Date(Date.now() - 172800000).toISOString(),
      },
    ]
  },
  {
    watch: [query],
  }
)

// function handleSearch() {
//   if (searchQuery.value.trim()) {
//     router.push(`/search?q=${encodeURIComponent(searchQuery.value.trim())}`)
//   }
// }

function formatDownloads(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  }
  return count.toString()
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'today'
  if (diffDays === 1) return 'yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
  return `${Math.floor(diffDays / 365)} years ago`
}
</script>
