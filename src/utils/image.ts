export function resolveImageUrl(url: string): string {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
  if (match) return `https://drive.google.com/uc?export=view&id=${match[1]}`
  return url
}
