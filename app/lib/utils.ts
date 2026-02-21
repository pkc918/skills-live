import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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
