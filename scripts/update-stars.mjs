import { readFile, writeFile } from 'node:fs/promises';

const snapshotUrl = new URL('../data/repos.json', import.meta.url);
const snapshot = JSON.parse(await readFile(snapshotUrl, 'utf8'));
const token = process.env.GITHUB_TOKEN;
const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'cvllm-homepage-star-updater',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

for (const repo of snapshot.repositories) {
  const response = await fetch(`https://api.github.com/repos/wangyendt/${repo.name}`, { headers });
  if (!response.ok) throw new Error(`GitHub API ${response.status} for ${repo.name}`);
  const metadata = await response.json();
  repo.stars = metadata.stargazers_count;
}

snapshot.repositories.sort((a, b) => b.stars - a.stars || a.name.localeCompare(b.name));
snapshot.generated_at = new Date().toISOString();
await writeFile(snapshotUrl, `${JSON.stringify(snapshot, null, 2)}\n`);
