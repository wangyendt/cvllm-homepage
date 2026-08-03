import { readFile, writeFile } from 'node:fs/promises';

const snapshotUrl = new URL('../data/repos.json', import.meta.url);
const leetcodeUrl = new URL('../data/leetcode.json', import.meta.url);
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

const profileResponse = await fetch('https://api.github.com/users/wangyendt', { headers });
if (!profileResponse.ok) throw new Error(`GitHub API ${profileResponse.status} for wangyendt`);
const profile = await profileResponse.json();
snapshot.profile = {
  public_repositories: profile.public_repos,
  followers: profile.followers,
};

snapshot.repositories.sort((a, b) => b.stars - a.stars || a.name.localeCompare(b.name));
snapshot.generated_at = new Date().toISOString();
await writeFile(snapshotUrl, `${JSON.stringify(snapshot, null, 2)}\n`);

const leetcodeQuery = `
  query userProfile($username: String!) {
    matchedUser(username: $username) {
      profile { ranking }
      submitStatsGlobal { acSubmissionNum { difficulty count } }
    }
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      totalParticipants
      topPercentage
      badge { name }
    }
  }
`;
const leetcodeResponse = await fetch('https://leetcode.com/graphql/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Referer: 'https://leetcode.com/u/wangyehope/',
    'User-Agent': 'cvllm-homepage-profile-updater',
  },
  body: JSON.stringify({ query: leetcodeQuery, variables: { username: 'wangyehope' } }),
});
if (!leetcodeResponse.ok) throw new Error(`LeetCode GraphQL ${leetcodeResponse.status}`);
const leetcodePayload = await leetcodeResponse.json();
if (leetcodePayload.errors?.length) throw new Error(`LeetCode GraphQL: ${leetcodePayload.errors[0].message}`);

const matched = leetcodePayload.data?.matchedUser;
const contest = leetcodePayload.data?.userContestRanking;
if (!matched) throw new Error('LeetCode profile wangyehope was not returned');
const solved = Object.fromEntries(
  matched.submitStatsGlobal.acSubmissionNum.map(({ difficulty, count }) => [difficulty.toLowerCase(), count]),
);
const leetcodeSnapshot = {
  generated_at: new Date().toISOString(),
  username: 'wangyehope',
  source: 'https://leetcode.com/graphql/',
  profile_ranking: matched.profile.ranking,
  solved,
  contest: contest ? {
    rating: contest.rating,
    global_ranking: contest.globalRanking,
    total_participants: contest.totalParticipants,
    top_percentage: contest.topPercentage,
    attended: contest.attendedContestsCount,
    badge: contest.badge?.name ?? null,
  } : null,
};
await writeFile(leetcodeUrl, `${JSON.stringify(leetcodeSnapshot, null, 2)}\n`);
