# LeetCode / GitHub 成绩数据自动更新调研

调研日期：2026-08-03（Asia/Shanghai）  
目标用户：LeetCode `wangyehope`、GitHub `wangyendt`

## 结论

主页需要的 LeetCode 成绩卡数据目前都能从 LeetCode 的第一方 GraphQL 端点 `https://leetcode.com/graphql/` 匿名读取：

| 展示项 | GraphQL 字段或计算方式 | 2026-08-03 实测值 |
| --- | --- | ---: |
| 总解题数 | `matchedUser.submitStatsGlobal.acSubmissionNum[difficulty=All].count` | 1,562 |
| Easy / Medium / Hard | 同一数组中对应难度的 `count` | 425 / 772 / 365 |
| 解题排名 | `matchedUser.profile.ranking` | 6,276 |
| 竞赛 Rating | `userContestRanking.rating` | 2,212.372 |
| 竞赛全球排名 | `userContestRanking.globalRanking` | 7,106 |
| 竞赛总参赛者 | `userContestRanking.totalParticipants` | 877,230 |
| Top 百分比 | `userContestRanking.topPercentage` | 0.86% |
| 参赛场次 | `userContestRanking.attendedContestsCount` | 148 |
| 竞赛等级 | `userContestRanking.badge.name` | Guardian |
| 历史最高 Rating | `max(userContestRankingHistory[].rating)`，仅统计 `attended=true` | 2,212.372 |

其中“解题排名”和“竞赛全球排名”是两个不同指标，主页应明确区分。`topPercentage` 应直接展示 LeetCode 返回值，不建议由 `globalRanking / totalParticipants` 重算，因为平台口径可能包含舍入或不同的排名总体。

上述数值来自对 [LeetCode 第一方 GraphQL 端点](https://leetcode.com/graphql/) 的实际 POST 响应；公开页面可交叉核对：[wangyehope 的 LeetCode 主页](https://leetcode.com/u/wangyehope/)。

LeetCode 的第一方说明可用于解释成绩卡含义：[竞赛排名规则](https://support.leetcode.com/hc/en-us/articles/360011883834-How-does-the-ranking-work-in-a-contest)、[Rating 算法说明](https://leetcode.com/discuss/post/518516/New-Rating-Algorithm-Details-Contest-Season-and-Absence-in-Participation/)和 [Guardian / Knight 竞赛徽章说明](https://leetcode.com/discuss/post/934706/The-new-contest-badge-is-here%21/)。

## 可运行的 LeetCode 请求

下面的单次请求同时返回解题数据、竞赛成绩和完整竞赛历史，不需要登录 Cookie 或 API Token：

```bash
curl --fail-with-body --silent --show-error \
  'https://leetcode.com/graphql/' \
  -H 'Content-Type: application/json' \
  -H 'User-Agent: cvllm-homepage-stats/1.0' \
  --data-raw '{
    "query": "query PortfolioStats($username: String!) { matchedUser(username: $username) { username profile { ranking } submitStatsGlobal { acSubmissionNum { difficulty count submissions } } } userContestRanking(username: $username) { attendedContestsCount rating globalRanking totalParticipants topPercentage badge { name } } userContestRankingHistory(username: $username) { attended rating ranking problemsSolved totalProblems contest { title startTime } } }",
    "variables": { "username": "wangyehope" }
  }'
```

2026-08-03 实测核心响应：

```json
{
  "data": {
    "matchedUser": {
      "username": "wangyehope",
      "profile": { "ranking": 6276 },
      "submitStatsGlobal": {
        "acSubmissionNum": [
          { "difficulty": "All", "count": 1562, "submissions": 1959 },
          { "difficulty": "Easy", "count": 425, "submissions": 528 },
          { "difficulty": "Medium", "count": 772, "submissions": 976 },
          { "difficulty": "Hard", "count": 365, "submissions": 455 }
        ]
      }
    },
    "userContestRanking": {
      "attendedContestsCount": 148,
      "rating": 2212.372,
      "globalRanking": 7106,
      "totalParticipants": 877230,
      "topPercentage": 0.86,
      "badge": { "name": "Guardian" }
    }
  }
}
```

如果成绩卡不展示历史最高 Rating，可以从查询中删除 `userContestRankingHistory`，以减小响应体。若需要最高分，则对 `attended=true` 的历史项取 `rating` 最大值；LeetCode 当前没有在 `userContestRanking` 中直接返回“历史最高 Rating”字段。

## GitHub 数据自动更新

GitHub 的公开仓库数据适合通过官方 REST API 更新。官方“List repositories for a user”端点可匿名列出指定用户的公开仓库，响应包含 `stargazers_count`；每页最多 100 条，因此 `wangyendt` 超过 100 个仓库时需要翻页。公开资源无需 Token，但 Actions 中使用仓库自带的 `GITHUB_TOKEN` 可获得更稳定的限额。

```bash
curl --fail-with-body --silent --show-error --location \
  -H 'Accept: application/vnd.github+json' \
  -H 'Authorization: Bearer '"$GITHUB_TOKEN" \
  -H 'X-GitHub-Api-Version: 2022-11-28' \
  'https://api.github.com/users/wangyendt/repos?type=owner&sort=updated&per_page=100&page=1'
```

来源：

- [GitHub REST API：List repositories for a user](https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-a-user)
- [GitHub REST API：Star 字段含义](https://docs.github.com/en/rest/activity/starring?apiVersion=2022-11-28)

## 推荐自动化方式

使用一个 GitHub Actions 工作流每天运行一次：

1. 请求 GitHub REST API，更新仓库 Star、仓库数量等快照。
2. 请求 LeetCode GraphQL，更新解题数、难度分布、解题排名和竞赛成绩。
3. 先校验响应中没有 `errors`，且 `matchedUser` 和 `userContestRanking` 非空；失败时保留上次成功数据，不把 `null` 写进主页。
4. 把结果和 `updatedAt` 写入版本化 JSON；仅在内容变化时提交。
5. 用仓库级 `GITHUB_TOKEN` 推回默认分支，权限仅授予 `contents: write`。

示例工作流骨架：

```yaml
name: Update portfolio stats

on:
  workflow_dispatch:
  schedule:
    - cron: "23 2 * * *"
      timezone: "Asia/Shanghai"

permissions:
  contents: write

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
        with:
          node-version: 24
      - run: node scripts/update-stats.mjs
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      - name: Commit changed snapshots
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
          git add data/
          git diff --cached --quiet && exit 0
          git commit -m "chore: refresh portfolio stats"
          git push
```

GitHub 官方文档说明：定时工作流运行在默认分支最新提交上，支持 POSIX cron，最短间隔 5 分钟；高负载时定时任务可能延迟或被丢弃，公共仓库 60 天无活动后 scheduled workflow 会自动停用。因此主页显示“数据更新时间”，并保留手动 `workflow_dispatch` 是更稳妥的方案。

来源：

- [GitHub Actions：`on.schedule` 语法](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#onschedule)
- [GitHub Actions：schedule 事件的限制](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule)
- [GitHub Actions：`GITHUB_TOKEN`](https://docs.github.com/en/actions/concepts/security/github_token)
- [GitHub Actions：为 `GITHUB_TOKEN` 配置最小权限](https://docs.github.com/en/actions/tutorials/authenticate-with-github_token#modifying-the-permissions-for-the-github_token)

## 限制与风险

- LeetCode GraphQL 端点和返回值是一手来源，并已匿名请求验证成功，但 LeetCode 没有为该网页内部接口发布面向第三方的稳定性、版本或速率限制承诺。查询字段未来可能调整，因此更新脚本必须校验结构并采用“失败保留旧数据”。
- 实测带 `Origin: https://cvllm.com` 的 GraphQL 响应没有 `Access-Control-Allow-Origin`，所以静态主页不能在访客浏览器中直接跨域刷新。应由 GitHub Actions 或服务器定时抓取，再让主页读取同源静态 JSON。
- 实测 GraphQL schema introspection 查询返回 `Query unavailable`；不要依赖运行时 introspection，应对脚本所需的少量字段做显式查询和结构校验。
- 不要把 LeetCode Cookie、会话或密码放入仓库；上述公开资料查询不需要这些凭据。
- 每日更新足够用于个人主页，不应高频轮询 LeetCode。
- `profile.ranking`、竞赛 Rating 和竞赛全球排名都会随平台数据变化；数据 JSON 应包含 UTC/ISO 8601 的 `updatedAt`，页面应注明“每日更新”。
- 由 `GITHUB_TOKEN` 推送产生的事件通常不会递归触发新的工作流，这可以避免自动更新循环；GitHub 也明确说明该 Token 的权限范围限于当前工作流所在仓库。
