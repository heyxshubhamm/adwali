# adwali website

This is the full adwali.com website (Next.js). It builds into a plain static site (HTML, CSS, JavaScript) that runs on any normal web host, including Hostinger shared hosting.

You do not need to be a developer to deploy this. Pick ONE of the two methods below.

---

## What is in this folder

- `app/`, `components/`, `lib/`, `content/` - the website source (the pages and the code).
- `public/` - static files, including `.htaccess` (the file that tells the server how to serve the site).
- `out/` - the website already built and ready to upload. This is what actually goes on the server.
- `.github/workflows/deploy.yml` - the automatic deploy setup (used in Method A).
- `package.json`, `next.config.mjs`, etc. - configuration.

---

## Method A - Automatic deploy (GitHub to Hostinger)

Every time you push a change to GitHub, it builds the site and uploads it to Hostinger for you. Set it up once, then you never touch files by hand again.

### Step 1 - Put the code on GitHub
1. Open this folder in VS Code.
2. Create a new repository on GitHub (github.com, New repository). Name it anything, keep it Private if you like.
3. In VS Code, use the Source Control panel (the branch icon on the left) to publish/push the code to that repository. Make sure the branch is named `main`.

### Step 2 - Get your Hostinger FTP details
1. Log in to Hostinger (hPanel).
2. Go to Files, then FTP Accounts.
3. Note down three things: the FTP hostname (looks like a domain or an IP), the FTP username, and the FTP password. If you do not know the password, create/reset it there.

### Step 3 - Add those details to GitHub as secrets
1. In your GitHub repository, go to Settings, then Secrets and variables, then Actions.
2. Click New repository secret and add these three (names must match exactly):
   - `FTP_SERVER` = your FTP hostname
   - `FTP_USERNAME` = your FTP username
   - `FTP_PASSWORD` = your FTP password

### Step 4 - Done
From now on, any push to GitHub automatically builds the site and uploads it to your `public_html`. You can also trigger it manually: in GitHub go to the Actions tab, pick "Deploy adwali to Hostinger", and click Run workflow.

Note: the deploy uploads into `public_html`. If your domain serves from a different folder, open `.github/workflows/deploy.yml` and change `server-dir: ./public_html/` to the correct folder.

---

## Method B - Manual upload (no GitHub needed, simplest one-time option)

1. Open the `out` folder inside this project.
2. Select everything inside it (`index.html`, the `_next` folder, `.htaccess`, `404.html`, and all the page folders like `about`, `services`, and so on).
3. In Hostinger, open File Manager and go into `public_html`.
4. Upload all of those files and folders directly into `public_html` (not inside another subfolder).
5. Important: `.htaccess` is a hidden file. In File Manager turn on "show hidden files" so it uploads too. Easiest way: zip the contents of `out`, upload the zip, then use the "Extract" button so everything lands at once.
6. Open your domain. The site is live.

---

## Editing the site later

The page content lives in the `content/` folder (one HTML file per page). The top navigation is in `components/SiteNav.js` and the footer is in `components/SiteFooter.js`.

- If you use Method A: edit the file, save, and push to GitHub. It rebuilds and redeploys on its own.
- If you use Method B: after editing, the site must be rebuilt. If you are comfortable, run `npm install` once, then `npm run build`, then upload the new `out` folder. If not, send the change to whoever manages the build.

---

## Fixing a 403 / Forbidden error

A 403 means the server could not find a homepage to show at the web root. Two things cause it:

1. The files were not uploaded to the right place, or the built site is missing. Make sure `index.html` and `.htaccess` sit directly inside `public_html`, not inside another folder. The `out` folder (or Method A) already includes both.
2. File permissions. In Hostinger File Manager, set folders to 755 and files to 644 (there is usually a "reset permissions" option). That clears a permission-based 403.

Once your SSL certificate is active, open `.htaccess` and remove the `#` in front of the three HTTPS lines so visitors always land on the secure version.
