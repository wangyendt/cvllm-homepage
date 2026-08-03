# cvllm.com portfolio homepage

This directory contains the standalone static homepage for `cvllm.com`.

## Preview

```bash
python3 -m http.server 8767 --directory portfolio
```

Then open <http://127.0.0.1:8767>.

## Deploy

Upload the complete directory (`index.html` and `data/`) to the Nginx document root serving `cvllm.com`.

Star counts live in `data/repos.json`. The included GitHub Actions workflow refreshes this snapshot every day and commits changes only when a count changes.

The current SSH alias for `120.79.132.219` uses port `6000` and reaches a different machine. Use the real ECS login on port `22` before deploying.
