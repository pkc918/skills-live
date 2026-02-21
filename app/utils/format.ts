/**
 * 将数字格式化为 GitHub 风格的 k/M 单位（用于 stars、forks、watchers）
 * 例如：999 → "999"，1000 → "1k"，1200 → "1.2k"，1500000 → "1.5M"
 */
export function formatCount(n: number): string {
  if (n < 1000) return String(n)
  if (n < 1_000_000) {
    const v = n / 1000
    return (v % 1 === 0 ? String(Math.round(v)) : v.toFixed(1).replace(/\.0$/, '')) + 'k'
  }
  const v = n / 1_000_000
  return (v % 1 === 0 ? String(Math.round(v)) : v.toFixed(1).replace(/\.0$/, '')) + 'M'
}

/**
 * 将日期字符串格式化为相对时间（today / yesterday / N days ago / N weeks ago / N months ago / N years ago）
 */
export function formatDate(dateString: string): string {
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

/**
 * 将字节数格式化为 B / KB
 */
export function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  return `${(bytes / 1024).toFixed(1)} KB`
}