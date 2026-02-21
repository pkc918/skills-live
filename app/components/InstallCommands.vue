<script setup lang="ts">
import { Copy, Check, Terminal } from 'lucide-vue-next'

type InstallType = 'npx' | 'pnpm'

const props = defineProps<{
  /** Repo slug e.g. antfu/skills */
  repo: string
}>()

const installType = ref<InstallType>('pnpm')

const commands = computed<Record<InstallType, string>>(() => ({
  npx: `npx skills add ${props.repo}`,
  pnpm: `pnpm dlx skills add ${props.repo}`,
}))

const currentCommand = computed(() => commands.value[installType.value])

const copied = ref(false)
let copiedTimer: ReturnType<typeof setTimeout> | null = null

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(currentCommand.value)
    copied.value = true
    if (copiedTimer) clearTimeout(copiedTimer)
    copiedTimer = setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    copied.value = false
  }
}
</script>

<template>
  <div class="space-y-3">
    <h3 class="text-sm font-semibold text-foreground">
      Install this agent skill to your local
    </h3>
    <div
      class="relative rounded-lg border border-border bg-muted/40 p-4"
    >
      <!-- Copy button: top-right -->
      <Button
        variant="ghost"
        size="sm"
        class="absolute right-2 top-2 flex size-8 items-center justify-center p-0 text-muted-foreground hover:text-foreground"
        :aria-label="copied ? '已复制' : '复制'"
        @click="copyToClipboard"
      >
        <Check v-if="copied" class="size-4 text-green-600" aria-hidden />
        <Copy v-else class="size-4" aria-hidden />
      </Button>

      <!-- Package manager tabs + terminal icon -->
      <div class="mb-3 flex items-center gap-2">
        <Terminal
          class="size-4 shrink-0 text-muted-foreground"
          aria-hidden
        />
        <div class="inline-flex gap-0.5 rounded-md border border-border bg-muted/60 p-0.5">
          <button
            v-for="t in (['pnpm', 'npx'] as const)"
            :key="t"
            type="button"
            class="rounded px-2.5 py-1 text-xs font-medium transition-colors"
            :class="
              installType === t
                ? 'bg-background text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            "
            @click="installType = t"
          >
            {{ t }}
          </button>
        </div>
      </div>

      <!-- Command -->
      <pre
        class="overflow-x-auto font-mono text-sm text-foreground"
      ><code>{{ currentCommand }}</code></pre>
    </div>
  </div>
</template>
