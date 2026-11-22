# Deployment on the local network

This guide runs CloudVault Web as a **production build**, without the development server, so it
can be opened from any device on the same network (another laptop, a phone, a tablet).

Nothing is installed or changed in Windows besides one firewall question, answered once (step 6).

## Overview

Two programs run on the same computer:

| Program        | Repository        | Port | Opened by                               |
| -------------- | ----------------- | ---- | --------------------------------------- |
| CloudVault API | `cloud_vault`     | 8000 | the web app (and Swagger / admin pages) |
| CloudVault Web | `cloud_vault_web` | 3000 | browsers on any device in the network   |

The browser only talks to the web app. The web app calls the API from the same computer
(`http://127.0.0.1:8000`), so the API address never has to be known by other devices.

```
phone / laptop  ──http://<IP>:3000──►  Next.js (this computer)  ──127.0.0.1:8000──►  FastAPI
```

### Development vs. production

|                | Development           | Production (this guide)                  |
| -------------- | --------------------- | ---------------------------------------- |
| Command        | `npm run dev`         | `npm run build`, then `npm start`        |
| Code           | compiled on each page | compiled once, optimized                 |
| Hot reload     | yes                   | no (rebuild after changes)               |
| Reachable from | this computer         | any device on the network (`-H 0.0.0.0`) |

## 1. Find the computer's IP address

```powershell
ipconfig
```

Use the **IPv4 Address of the Wi-Fi adapter** (or Ethernet, if the computer is on a cable),
e.g. `192.168.1.20`. The rest of this guide writes it as `<IP>`.

Ignore addresses of virtual adapters such as `192.168.56.x` (VirtualBox): other devices cannot
reach them, even though Next.js may print one as its "Network" address.

## 2. Start the API

Follow `docs/deployment.md` in the `cloud_vault` repository. Check that it answers on this
computer:

```powershell
curl.exe http://127.0.0.1:8000/health
```

## 3. Configure the web app

In `.env.local` (create it from `.env.example` if it does not exist):

```
API_URL=http://127.0.0.1:8000
COOKIE_SECURE=false
```

- `API_URL`: the API runs on the same computer, so the web app reaches it on `127.0.0.1`.
- `COOKIE_SECURE=false`: production builds mark the session cookies `Secure` (HTTPS only) by
  default. Browsers drop `Secure` cookies on plain `http://` addresses other than `localhost`,
  so without this setting signing in from `http://<IP>:3000` would not work.

## 4. Build

From the `cloud_vault_web` folder:

```powershell
npm ci
```

```powershell
npm run build
```

The build must finish with `Compiled successfully`. Run it again after every code change.

## 5. Start

```powershell
npm start -- -H 0.0.0.0 -p 3000
```

- `-H 0.0.0.0` listens on every network interface, not only on `localhost`, so other devices
  can connect.
- `-p 3000` is the port.
- Keep the terminal open: closing it stops the app.

## 6. Allow the connection in Windows Firewall

The first time the app listens on the network, Windows asks whether **Node.js** may accept
connections. Choose **Allow**. If the Wi-Fi is marked as a **Public** network, tick the public
networks option in that dialog; otherwise other devices are blocked.

This only lets `node.exe` receive connections; no protection is turned off. The API asks the
same for `python.exe` (see the API guide).

## 7. Open the app from another device

The device must be on the **same network** (same Wi-Fi) as the computer. Open:

```
http://<IP>:3000
```

(replace `<IP>` with the address from step 1).

## 8. Check

- [ ] `http://<IP>:3000` opens the login page on another device.
- [ ] Register and sign in work, and the Home page shows the account.
- [ ] Buckets: create, edit, open and delete a bucket.
- [ ] Sign out returns to the login page.
- [ ] Nothing runs with `npm run dev` or `--reload`.

## Troubleshooting

| Problem                                        | Cause and fix                                                                                     |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| The page does not open on another device       | Wrong IP (step 1), not on the same Wi-Fi, or the firewall question was refused (step 6).          |
| Sign in succeeds but returns to the login page | `COOKIE_SECURE=false` is missing in `.env.local` (step 3); restart `npm start` after changing it. |
| "The CloudVault service is unavailable"        | The API is not running or `API_URL` is wrong (steps 2–3).                                         |
| `Could not find a production build`            | Run `npm run build` before `npm start` (step 4).                                                  |
| Port 3000 is already in use                    | Stop `npm run dev` or another app on that port, or start with `-p 3001`.                          |
