# Content Update Workflow

## 1. Edit Content

Open and edit the spreadsheet:
```
.idems_app/deployments/my_website/sheets/my_website.xlsx
```

---

## 2. Sync Sheets to App Data

Convert the xlsx into JSON app data (one-shot, no watcher):
```bash
yarn workflow sync_local --deployment my_website
```

To also watch for further changes and re-sync automatically:
```bash
yarn workflow sync_local --deployment my_website --watch
```

> **Note:** The `--watch` flag was added to `sync_local` in the open-app-builder fork
> (`justxuewei/open-app-builder`, branch `ruc`). Without it, the workflow exits after
> the initial sync instead of staying alive in watch mode.

---

## 3. Commit and Push to GitHub

```bash
cd .idems_app/deployments/my_website
git add sheets/my_website.xlsx
git commit -s -m "content: describe your change"
git push origin main
```

To create a versioned release (from the repo root):
```bash
yarn workflow repo publish
```
This prompts for a version bump, then pushes a `content/vX.X.X` branch and tag to GitHub.

---

## 4. Deploy to Production (Ubuntu + nginx)

### Build and copy frontend

From the repo root:
```bash
yarn build
rsync -av www/ /var/www/my_website/
```

### Start services

From `packages/server/docker/`:
```bash
# First time or after container removal
docker compose up -d

# If containers already exist but are stopped
docker start $(docker ps -aq)
```

### Stop services

```bash
docker compose down          # stop and remove containers/networks
# or just stop without removing:
docker stop $(docker ps -q)
```

> **Note:** `docker compose down` only removes containers it created in that session.
> If containers were started in a previous session, use `docker rm <name>` to remove
> stale containers before running `docker compose up -d` again.

---

## Component Reference

Template rows in the xlsx support a wide range of built-in components.
Full documentation: **https://open-app-builder.com/components/**

| Component | Description | Docs |
|-----------|-------------|------|
| `html` | Render arbitrary HTML, including Ionic components (cards, progress bars, etc.) | [html](https://open-app-builder.com/components/html/) |
| `audio` | Play audio files | [audio](https://open-app-builder.com/components/audio/) |
| `button` | Tappable button with action | [button](https://open-app-builder.com/components/button/) |
| `text` | Plain text display | [text](https://open-app-builder.com/components/text/) |
| `title` | Section heading | [title](https://open-app-builder.com/components/title/) |
| `image` | Display an image asset | [image](https://open-app-builder.com/components/image/) |
| `video` | Embed a video | [video](https://open-app-builder.com/components/video/) |
| `input` | Text input field | [input](https://open-app-builder.com/components/input/) |
| `display_group` | Group/nest rows in a container | [display_group](https://open-app-builder.com/components/display_group/) |
| `task_progress_bar` | Progress bar driven by task completion data | [task_progress_bar](https://open-app-builder.com/components/task_progress_bar/) |

For the full component list see https://open-app-builder.com/components/.
