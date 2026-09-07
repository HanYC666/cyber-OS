# CyberOS

CyberOS is a polished browser-only desktop designed for a minimal static host. It has no login, server-side application code, databases, or build dependencies.

## Run

Serve the project directory with any static file server, then open `index.html` in a modern browser. For example:

```sh
python3 -m http.server 4173
```

## Included

- Draggable, resizable, minimizable, and maximizable app windows.
- File Explorer with a clickable simulated Linux filesystem rooted at `/`.
- Terminal simulator as `root@cyberos` with Linux-style command handling.
- Client-side GET-only `curl` and `ping`, plus simulated `nmap` and `dig`.
- Calculator, calendar, application menu, and working File and Window menus.
- Canvas-based matrix rain wallpaper rendered locally in the browser.

## Resource Profile

The application is plain HTML, CSS, and JavaScript. A Raspberry Pi can serve it with a static server; no Flask, Node runtime, or application backend is required.
