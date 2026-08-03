# cvllm.com portfolio homepage

This directory contains the standalone static homepage for `cvllm.com`.

## Preview

```bash
python3 -m http.server 8767
```

Then open <http://127.0.0.1:8767>.

## Deploy

The production checkout lives at `/var/www/wayne_web` on the ECS host and is served directly by Nginx.

## Automatic public data

- `data/repos.json`: GitHub repository Stars and public repository count.
- `data/leetcode.json`: solved totals, difficulty distribution, profile rank, contest Rating, global rank, Top percentage, contest count, and badge.
- `.github/workflows/update-stars.yml`: refreshes both snapshots every day at 02:17 UTC and can also be run manually.
- `deploy/cvllm-profile-data.cron`: production pulls the committed snapshots at 02:47 UTC, so the live static site receives the update without exposing credentials or making third-party requests in visitors' browsers.

The updater preserves the last committed snapshot if an upstream request fails. LeetCode's browser endpoint does not permit a static site to fetch it cross-origin, so data is collected server-side and served as same-origin JSON.

The current SSH alias for `120.79.132.219` uses port `6000` and reaches a different machine. Use the real ECS login on port `22` before deploying.
