# Content Update Workflow

## 1. Edit Content

Open and edit the spreadsheet:
```
.idems_app/deployments/my_website/sheets/my_website.xlsx
```

---

## 2. Preview Locally

**If the dev server is already running** (`yarn start:local`), changes are picked up automatically after ~15 seconds.

**If the dev server is not running**, start it from the repo root:
```bash
NODE_OPTIONS="--max-old-space-size=6144" npx concurrently --kill-others --raw \
  "ng serve --host 0.0.0.0 --disable-host-check" \
  "yarn workflow sync_local"
```

Open the app at `http://localhost:4200`.

---

## 3. Commit and Push to GitHub

```bash
cd .idems_app/deployments/my_website
git add sheets/my_website.xlsx
git commit -m "content: describe your change"
git push origin main
```

To create a versioned release (from the repo root):
```bash
yarn workflow repo publish
```
This prompts for a version bump, then pushes a `content/vX.X.X` branch and tag to GitHub.

---

## 4. Deploy to Production (Ubuntu + nginx)

From the repo root:
```bash
yarn build
rsync -av www/ user@your-server:/var/www/myapp/
```
