import { execFileSync } from 'node:child_process'

const trackedFiles = execFileSync('git', ['ls-files'], { encoding: 'utf8' })
  .split('\n')
  .filter(Boolean)

const excluded = new Set([
  'package-lock.json',
  'scripts/security-scan.mjs',
])

const providerPatterns = [
  { name: 'OpenAI key', regex: /sk-[A-Za-z0-9_-]{20,}/g },
  { name: 'GitHub token', regex: /gh[pousr]_[A-Za-z0-9_]{20,}/g },
  { name: 'Google API key', regex: /AIza[0-9A-Za-z_-]{30,}/g },
  { name: 'Private key', regex: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g },
]

const findings = []

for (const file of trackedFiles) {
  if (excluded.has(file)) continue

  let content
  try {
    content = execFileSync('git', ['show', `:${file}`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
  } catch {
    continue
  }

  for (const pattern of providerPatterns) {
    const matches = content.match(pattern.regex)
    if (matches?.length) findings.push(`${pattern.name}: ${file}`)
  }
}

if (findings.length > 0) {
  console.error('Potential provider credentials detected:')
  for (const finding of findings) console.error(`- ${finding}`)
  process.exit(1)
}

console.log(`Security scan passed for ${trackedFiles.length} tracked files.`)