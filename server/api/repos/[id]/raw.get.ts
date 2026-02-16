import { createApiError } from '~~/server/utils/errors'

/** GET /api/repos/:id/raw?path=... — 代理拉取 GitHub 仓库 raw 文件内容 */
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const path = getQuery(event).path as string
  if (!id || !path?.trim()) {
    throw createApiError('MISSING_REPO_ID')
  }

  const sql = useDb()
  const rows = await sql`
    SELECT repo, default_branch FROM ${sql.unsafe(REPOS_FULL_TABLE)}
    WHERE id = ${Number(id)}
    LIMIT 1
  `
  const repo = rows[0]
  if (!repo) {
    throw createApiError('REPO_NOT_FOUND')
  }

  const safePath = path.trim().split('/').map(encodeURIComponent).join('/')
  const url = `https://raw.githubusercontent.com/${repo.repo}/${repo.default_branch}/${safePath}`
  const res = await fetch(url)
  if (!res.ok) {
    setResponseStatus(event, res.status)
    return { error: 'File not found or inaccessible' }
  }
  const text = await res.text()
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return text
})
