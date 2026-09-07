# CyberOS

> A tiny browser desktop with a terminal brain, a matrix sky, and zero backend baggage.

CyberOS is a web operating system by YC: part portfolio, part cybersecurity playground, part excuse to see how much computer can fit into a static website. It runs entirely in the browser, has no login screen, and is designed to be light enough for a Raspberry Pi Zero W.

It is built for curious people who like terminals, packet captures, CTF writeups, and clicking buttons that probably should not be buttons.

## What's Inside

- A polished desktop with draggable, resizable, minimizable, and maximizable windows.
- A browser-native terminal running as `root@cyberos` with familiar Linux-style commands.
- A safe simulated filesystem with `/`, `/root`, `/home`, `/etc`, `/usr`, `/var`, and `/tmp`.
- Client-side cybersecurity learning tools: simulated `nmap` and `dig`, plus browser-only GET-based `curl` and `ping`.
- Calculator, Calendar, App launcher, File menu, Window menu, Dock, Devlog, and About apps.
- A local canvas matrix-rain wallpaper. No remote assets. No API calls. No mystery server process.
- Local command history that stays in the browser through `localStorage`.

## Safety Model

CyberOS is a frontend simulator, not a shell on the host machine.

- Terminal commands operate on an in-browser fake filesystem.
- `nmap` and `dig` return simulated educational output.
- `curl` and `ping` make `GET` requests directly from the visitor's browser, never through a CyberOS backend.
- The embedded web server accepts only `GET`; other methods return `405 Method Not Allowed`.
- No passwords, user accounts, databases, POST endpoints, or server-side application logic are included.

## Run It Locally

For normal frontend development, serve the project directory with any static server:

```sh
python3 -m http.server 4173
```

Open `http://127.0.0.1:4173` in a modern browser.

## Raspberry Pi Mode

`cyberos-server-linux-armv6` is a stripped, statically linked Linux ARMv6 binary built for a Raspberry Pi Zero W. The current `index.html`, `styles.css`, and `app.js` are embedded inside it, so the binary can run on its own.

```sh
chmod +x cyberos-server-linux-armv6
./cyberos-server-linux-armv6 -addr 127.0.0.1:8010
```

Visit `http://127.0.0.1:8010` locally, or point an existing reverse proxy/tunnel at that address.

## Build Notes

The UI is plain HTML, CSS, and JavaScript. The server is a small Go program compiled as a static ARMv6 binary. There is no Flask, Node runtime, package install, container, or database waiting in the shadows.

That keeps CyberOS small, cheap to host, and easy to understand: the interesting work happens on the client, where it belongs.

## Project Files

```text
index.html                     Desktop and app markup
styles.css                     Visual system and responsive layout
app.js                         Window manager, terminal, apps, and matrix rain
server.go                      Embedded GET-only Go server
cyberos-server-linux-armv6     Raspberry Pi Zero W executable
deploy/                        systemd unit reference
CHANGELOG.md                   Version history
```

## AI disclosure

GPT 5.6 Luna was used to help format parts of the code and enforce backend security.
